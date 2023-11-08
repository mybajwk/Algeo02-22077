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
	h1 := height / 3
	h2 := 2 * h1
	w1 := width / 3
	w2 := 2 * w1

	rgbMatrix1 := make([]schema.HSV, h1*w1)
	rgbMatrix2 := make([]schema.HSV, h1*w1)
	rgbMatrix3 := make([]schema.HSV, h1*(width-w2))
	rgbMatrix4 := make([]schema.HSV, h1*w1)
	rgbMatrix5 := make([]schema.HSV, h1*w1)
	rgbMatrix6 := make([]schema.HSV, h1*(width-w2))
	rgbMatrix7 := make([]schema.HSV, (height-h2)*w1)
	rgbMatrix8 := make([]schema.HSV, (height-h2)*w1)
	rgbMatrix9 := make([]schema.HSV, (height-h2)*(width-w2))
	idx := 0
	for y := 0; y < h1; y++ {
		for x := 0; x < w1; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix1[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := 0; y < h1; y++ {
		for x := w1; x < w2; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix2[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := 0; y < h1; y++ {
		for x := w2; x < width; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix3[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := h1; y < h2; y++ {
		for x := 0; x < w1; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix4[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := h1; y < h2; y++ {
		for x := w1; x < w2; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix5[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := h1; y < h2; y++ {
		for x := w2; x < width; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix6[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := h2; y < height; y++ {
		for x := 0; x < w1; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix7[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := h2; y < height; y++ {
		for x := w1; x < w2; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix8[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	idx = 0
	for y := h2; y < height; y++ {
		for x := w2; x < width; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix9[idx] = utilities.ConvertRGBToHSV(r, g, b)
			idx++
		}
	}
	_ = utilities.GetVector(rgbMatrix1)
	_ = utilities.GetVector(rgbMatrix2)
	_ = utilities.GetVector(rgbMatrix3)
	_ = utilities.GetVector(rgbMatrix4)
	_ = utilities.GetVector(rgbMatrix5)
	_ = utilities.GetVector(rgbMatrix6)
	_ = utilities.GetVector(rgbMatrix7)
	_ = utilities.GetVector(rgbMatrix8)
	_ = utilities.GetVector(rgbMatrix9)
	// context.JSON(http.StatusOK, gin.H{"success": true, "data": vector2})
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

	vector := make(map[int][][]int)
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

				bounds := img.Bounds()
				width, height := bounds.Max.X, bounds.Max.Y
				h1 := height / 3
				h2 := 2 * h1
				w1 := width / 3
				w2 := 2 * w1

				rgbMatrix1 := make([]schema.HSV, h1*w1)
				rgbMatrix2 := make([]schema.HSV, h1*w1)
				rgbMatrix3 := make([]schema.HSV, h1*(width-w2))
				rgbMatrix4 := make([]schema.HSV, h1*w1)
				rgbMatrix5 := make([]schema.HSV, h1*w1)
				rgbMatrix6 := make([]schema.HSV, h1*(width-w2))
				rgbMatrix7 := make([]schema.HSV, (height-h2)*w1)
				rgbMatrix8 := make([]schema.HSV, (height-h2)*w1)
				rgbMatrix9 := make([]schema.HSV, (height-h2)*(width-w2))
				idx := 0
				for y := 0; y < h1; y++ {
					for x := 0; x < w1; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix1[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := 0; y < h1; y++ {
					for x := w1; x < w2; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix2[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := 0; y < h1; y++ {
					for x := w2; x < width; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix3[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := h1; y < h2; y++ {
					for x := 0; x < w1; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix4[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := h1; y < h2; y++ {
					for x := w1; x < w2; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix5[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := h1; y < h2; y++ {
					for x := w2; x < width; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix6[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := h2; y < height; y++ {
					for x := 0; x < w1; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix7[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := h2; y < height; y++ {
					for x := w1; x < w2; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix8[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				idx = 0
				for y := h2; y < height; y++ {
					for x := w2; x < width; x++ {
						r, g, b, _ := img.At(x, y).RGBA()
						rgbMatrix9[idx] = utilities.ConvertRGBToHSV(r, g, b)
						idx++
					}
				}
				result := make([][]int, 9)
				result[0] = utilities.GetVector(rgbMatrix1)
				result[1] = utilities.GetVector(rgbMatrix2)
				result[2] = utilities.GetVector(rgbMatrix3)
				result[3] = utilities.GetVector(rgbMatrix4)
				result[4] = utilities.GetVector(rgbMatrix5)
				result[5] = utilities.GetVector(rgbMatrix6)
				result[6] = utilities.GetVector(rgbMatrix7)
				result[7] = utilities.GetVector(rgbMatrix8)
				result[8] = utilities.GetVector(rgbMatrix9)

				// Lock once to update the map
				mu.Lock()
				vector[i] = result
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
