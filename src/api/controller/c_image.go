package controller

import (
	"algeo02/schema"
	"algeo02/utilities"
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image"
	_ "image/jpeg"
	"image/png"
	"io/fs"
	"os"
	"path/filepath"
	"sync"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/rs/zerolog/log"
)

func Check(context *gin.Context) {

	var input schema.CheckImageBodyRequest

	if err := context.ShouldBindJSON(&input); err != nil {
		log.Err(err).Msg("Error Bind JSON")
		context.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Bind JSON"})
		return
	}
	validator := validator.New()
	if err := validator.Struct(input); err != nil {
		log.Err(err).Msg("Error Validator")
		context.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Validator"})
		return
	}

	imageData, err := base64.StdEncoding.DecodeString(input.Image)
	if err != nil {
		log.Err(err).Msg("Error Decode Base64")
		return
	}

	// Create a reader from the image data
	imageReader := bytes.NewReader(imageData)
	image.RegisterFormat("png", "png", png.Decode, png.DecodeConfig)

	// Decode the image into an image.Image
	img, _, err := image.Decode(imageReader)
	if err != nil {
		log.Err(err).Msg("Error Decode Image")
		return
	}

	bounds := img.Bounds()
	width, height := bounds.Max.X, bounds.Max.Y
	rgbMatrix := make([]schema.HSV, height*width)

	idx := 0

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	vector := utilities.GetVector(rgbMatrix)
	context.JSON(http.StatusOK, gin.H{"success": true, "data": vector})
	log.Info().Msg("Yey Success")
}
func CheckV1(context *gin.Context) {

	// var input schema.CheckImageBodyRequest

	// if err := context.ShouldBindJSON(&input); err != nil {
	// 	log.Err(err).Msg("Error Bind JSON")
	// 	context.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Bind JSON"})
	// 	return
	// }
	// validator := validator.New()
	// if err := validator.Struct(input); err != nil {
	// 	log.Err(err).Msg("Error Validator")
	// 	context.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Validator"})
	// 	return
	// }

	// imageData, err := base64.StdEncoding.DecodeString(input.Image)
	// if err != nil {
	// 	log.Err(err).Msg("Error Decode Base64")
	// 	return
	// }

	// // Create a reader from the image data
	// imageReader := bytes.NewReader(imageData)
	files, err := os.ReadDir("data")
	if err != nil {
		log.Err(err).Msg("Error open folder")
	}

	// Iterate over the files in the directory
	image.RegisterFormat("png", "png", png.Decode, png.DecodeConfig)

	vector := make(map[int][]int)
	var wg sync.WaitGroup
	var mu sync.Mutex
	limit := make(chan struct{}, 130)

	for i, file := range files {
		wg.Add(1)
		go func(file fs.DirEntry, i int) {
			limit <- struct{}{} // Limit concurrency
			defer wg.Done()
			defer func() { <-limit }()

			if !file.IsDir() {
				// Processing file...
				filePath := filepath.Join("data", file.Name())
				file, err := os.Open(filePath)
				if err != nil {
					log.Err(err).Msg("Error open file")
					return
				}
				defer file.Close()

				// Decode the image...
				img, _, err := image.Decode(file)
				if err != nil {
					log.Err(err).Msg("Error Decode Image")
					return
				}

				// Initialize rgbMatrix...
				bounds := img.Bounds()
				width, height := bounds.Max.X, bounds.Max.Y
				rgbMatrix := make([]schema.HSV, height*width)

				// Process the image...
				idx := 0
				for y := 0; y < height; y++ {
					for x := 0; x < width; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}

				// Get vector representation...
				resultVector := utilities.GetVector(rgbMatrix)

				// Lock once to update the map
				mu.Lock()
				vector[i] = resultVector
				mu.Unlock()
			}
		}(file, i)
	}

	wg.Wait()
	// Specify the file path and name
	filePath := "data.json"

	// Open a file for writing
	file, err := os.Create(filePath)
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	// Create an encoder for JSON
	encoder := json.NewEncoder(file)

	// Encode and write the data to the file
	if err := encoder.Encode(vector); err != nil {
		fmt.Println("Error encoding data to JSON:", err)
	}
	context.JSON(http.StatusOK, gin.H{"success": true, "dataas": vector[0]})
}
