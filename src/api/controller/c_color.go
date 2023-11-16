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
	_ "image/jpeg"
	"image/png"
	"os"
	"sort"
	"sync"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/rs/zerolog/log"
)

func CheckColor(context *gin.Context) {

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
	rgbMatrix := make([][]schema.HSV, block*block)
	idx := 0

	for i := 0; i < block; i++ {
		for j := 0; j < block; j++ {
			temp := 0
			rgbMatrix[idx] = make([]schema.HSV, (h[i+1]-h[i])*(w[j+1]-w[j]))
			print(rgbMatrix[i][0].H)
			for y := 0; y < h[i+1]-h[i]; y++ {
				for x := 0; x < w[j+1]-w[j]; x++ {
					r, g, b, _ := img.At(x+w[j], y+h[i]).RGBA()
					rgbMatrix[idx][temp] = utilities.ConvertRGBToHSV(r, g, b)
					temp++

				}
			}
			idx++
		}
	}

	hist := make([][]int, block*block)
	for i := 0; i < block*block; i++ {
		hist[i] = utilities.GetVector(rgbMatrix[i])
	}

	// read from json
	file, err := os.Open("data/" + input.Token + "/data_color.json")
	if err != nil {
		context.JSON(http.StatusOK, gin.H{"success": false, "message": "Dataset masih kosong"})
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	var data map[int][][]int

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		context.JSON(http.StatusOK, gin.H{"success": false, "message": "Dataset masih kosong"})
		fmt.Println("Error decoding JSON:", err)
		return
	}
	var tempData []schema.Result
	result := make(map[int][]schema.Result)
	for key, val := range data {
		temp := 0.0
		for i, value := range val {
			temp1 := utilities.CosineSimilarityColor(value, hist[i])
			temp += temp1
			if i == 5 || i == 6 || i == 9 || i == 10 {
				temp += temp1
			}
		}
		temp /= float64(block*block + 4)
		if temp > 0.6 {

			res := schema.Result{
				Name:       key,
				Similarity: temp,
			}
			// result[idx] = append(result[idx], res)
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
func UploadDataSetColor(context *gin.Context) {

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

	vector := make(map[int][][]int)
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
			rgbMatrix := make([][]schema.HSV, block*block)
			idx := 0

			for i := 0; i < block; i++ {
				for j := 0; j < block; j++ {
					temp := 0
					rgbMatrix[idx] = make([]schema.HSV, (h[i+1]-h[i])*(w[j+1]-w[j]))
					for y := 0; y < h[i+1]-h[i]; y++ {
						for x := 0; x < w[j+1]-w[j]; x++ {
							r, g, b, _ := img.At(x+w[j], y+h[i]).RGBA()
							rgbMatrix[idx][temp] = utilities.ConvertRGBToHSV(r, g, b)
							temp++

						}
					}
					idx++
				}
			}
			temp := block * block

			hist := make([][]int, temp)
			for i := 0; i < temp; i++ {
				hist[i] = utilities.GetVector(rgbMatrix[i])
			}

			// Lock once to update the map
			mu.Lock()
			vector[i] = hist
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
	filePath := "data/" + input.Token + "/data_color.json"

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
