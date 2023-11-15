package controller

import (
	"algeo02/schema"
	"algeo02/utilities"
	"archive/zip"
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image"
	"image/png"
	"net/http"
	"os"
	"sort"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/rs/zerolog/log"
)

func CheckTexture(context *gin.Context) {
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
	block := 4
	h := make([]int, block+1)
	w := make([]int, block+1)
	for i := 0; i <= block; i++ {
		h[i] = height * i / block
		w[i] = width * i / block
	}
	idx := 0
	grayImage := make([][][]uint8, block*block)
	for i := 0; i < block; i++ {
		for j := 0; j < block; j++ {
			grayImage[idx] = make([][]uint8, h[i+1]-h[i])
			for y := range grayImage[idx] {
				grayImage[idx][y] = make([]uint8, w[j+1]-w[j])
				for x := range grayImage[idx][y] {
					originalColor := img.At(w[j]+x, h[i]+y)
					r, g, b, _ := originalColor.RGBA()
					gray := uint8(0.299*float64(r<<8) + 0.587*float64(g<<8) + 0.114*float64(b<<8))
					grayImage[idx][y][x] = gray
				}
			}
			idx++
		}
	}

	matrix := make([][][]float64, block*block)
	vector := make([][]float64, block*block)
	temp := block * block
	for i := 0; i < temp; i++ {
		matrix[i] = utilities.GetCoOccurrenceMatrix(grayImage[i])
		vector[i] = utilities.GetCHE(matrix[i])
	}

	// read from file
	file, err := os.Open("data/" + input.Token + "/data_texture.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	var data map[int][][]float64

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	idx = 1
	var tempData []schema.Result
	result := make(map[int][]schema.Result)
	for key, val := range data {
		temp := 0.0
		for i, value := range val {
			temp += utilities.CosineSimilarityTexture(value, vector[i])
		}
		temp /= 16
		if temp > 0.6 {

			res := schema.Result{
				Name:       key,
				Similarity: temp,
			}
			tempData = append(tempData, res)
		}
	}
	sort.Slice(tempData, func(i, j int) bool {
		return tempData[i].Similarity > tempData[j].Similarity
	})
	idx = 1
	for _, val := range tempData {

		if val.Similarity > 0.6 {
			if len(result[idx]) == 8 {
				idx++
			}
			result[idx] = append(result[idx], val)
		}
	}

	filePath := "data/" + input.Token + "/result.json"

	// Open a file for writing
	fileResult, err := os.Create(filePath)
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer fileResult.Close()

	// Create an encoder for JSON
	encoder := json.NewEncoder(fileResult)

	// Encode and write the data to the file
	if err := encoder.Encode(result); err != nil {
		fmt.Println("Error encoding data to JSON:", err)
	}

	context.JSON(http.StatusOK, gin.H{"success": true, "page": idx, "data": result[1]})
	log.Info().Msg("Yey Success")
}

func UploadDataSetTexture(context *gin.Context) {
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

	zipBytes, err := base64.StdEncoding.DecodeString(input.Image)
	if err != nil {
		log.Err(err).Msg("Error Bind JSON")
	}

	// Step 2: Read the ZIP file
	zipReader, err := zip.NewReader(bytes.NewReader(zipBytes), int64(len(zipBytes)))
	if err != nil {
		log.Err(err).Msg("Error Bind JSON")
	}

	// Iterate over the files in the directory
	image.RegisterFormat("png", "png", png.Decode, png.DecodeConfig)

	vector := make(map[int][][]float64)
	var wg sync.WaitGroup
	var mu sync.Mutex
	limit := make(chan struct{}, 130)

	for i, file := range zipReader.File {
		wg.Add(1)
		go func(file *zip.File, i int) {
			limit <- struct{}{} // Limit concurrency
			defer wg.Done()
			defer func() { <-limit }()

			// Processing file...
			f, err := file.Open()
			if err != nil {
				log.Err(err).Msg("Error Bind JSON")
			}
			defer f.Close()

			// Decode the image...
			img, _, err := image.Decode(f)
			if err != nil {
				log.Err(err).Msg("Error Decode Image")
				return
			}

			bounds := img.Bounds()
			width, height := bounds.Max.X, bounds.Max.Y
			block := 4
			h := make([]int, block+1)
			w := make([]int, block+1)
			for i := 0; i <= block; i++ {
				h[i] = height * i / block
				w[i] = width * i / block
			}
			idx := 0
			grayImage := make([][][]uint8, block*block)
			for i := 0; i < block; i++ {
				for j := 0; j < block; j++ {
					grayImage[idx] = make([][]uint8, h[i+1]-h[i])
					for y := range grayImage[idx] {
						grayImage[idx][y] = make([]uint8, w[j+1]-w[j])
						for x := range grayImage[idx][y] {
							originalColor := img.At(w[j]+x, h[i]+y)
							r, g, b, _ := originalColor.RGBA()
							gray := uint8(0.299*float64(r<<8) + 0.587*float64(g<<8) + 0.114*float64(b<<8))
							grayImage[idx][y][x] = gray
						}
					}
					idx++
				}
			}

			matrix := make([][][]float64, block*block)
			dataVector := make([][]float64, block*block)
			temp := block * block
			for i := 0; i < temp; i++ {
				matrix[i] = utilities.GetCoOccurrenceMatrix(grayImage[i])
				dataVector[i] = utilities.GetCHE(matrix[i])
			}

			// Lock once to update the map
			mu.Lock()
			vector[i] = dataVector
			mu.Unlock()

		}(file, i)
	}

	wg.Wait()

	err = os.RemoveAll("data/" + input.Token)

	if err != nil {
		log.Err(err).Msg("Error delete folder")

	}
	err = os.MkdirAll("data/"+input.Token, os.ModeDir)
	if err != nil {
		log.Err(err).Msg("Error create folder")
	}
	go func() {
		for i, file := range zipReader.File {
			f, err := file.Open()
			if err != nil {
				log.Err(err).Msg("Error Bind JSON")
			}
			defer f.Close()

			// Decode the image...
			img, _, err := image.Decode(f)
			if err != nil {
				log.Err(err).Msg("Error Decode Image")
				return
			}
			newFile, err := os.Create(fmt.Sprintf("data/"+input.Token+"/%d.png", i))
			if err != nil {
				fmt.Println("Error creating output file:", err)
				return
			}
			defer newFile.Close()

			// Write the content to the new file
			err = png.Encode(newFile, img)
			if err != nil {
				log.Err(err).Msg("Error Decode Image")
			}
		}
	}()
	// Specify the file path and name
	filePath := "data/" + input.Token + "/data_texture.json"

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
