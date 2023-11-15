package utilities

import (
	"algeo02/schema"
	"encoding/json"
	"fmt"
	"image"
	"os"
	"path/filepath"
	"strconv"

	"github.com/rs/zerolog/log"
)

func GenerateVectorFromFolder(token string) {
	vector := make(map[int][][]int)
	vectorTexture := make(map[int][][]float64)
	dir := "data/" + token
	files, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println("Error reading directory:", err)
		return
	}

	// Iterate over the files and print the file names without extensions
	for _, file := range files {
		if !file.IsDir() {
			name := file.Name()
			// Strip the extension from the file name
			nameWithoutExt := name[:len(name)-len(filepath.Ext(name))]
			fmt.Println(nameWithoutExt)
			filePath := filepath.Join(dir, file.Name())

			// Open the file
			f, err := os.Open(filePath)
			if err != nil {
				log.Err(err).Msg("Error Bind JSON")
			}
			defer f.Close()

			// Decode the image...
			img, _, err := image.Decode(f)
			if err != nil {
				log.Err(err).Msg("Error Decode Image")
				continue
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
							rgbMatrix[idx][temp] = ConvertRGBToHSV(r, g, b)
							temp++

						}
					}
					idx++
				}
			}
			temp := block * block

			hist := make([][]int, temp)
			for i := 0; i < temp; i++ {
				hist[i] = GetVector(rgbMatrix[i])
			}

			// texture
			idx = 0
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
			for i := 0; i < temp; i++ {
				matrix[i] = GetCoOccurrenceMatrix(grayImage[i])
				dataVector[i] = GetCHE(matrix[i])
			}
			i, err := strconv.Atoi(nameWithoutExt)
			if err == nil {
				vector[i] = hist
				vectorTexture[i] = dataVector
			}
		}
	}
	// Specify the file path and name
	filePathColor := "data/" + token + "/data_color.json"
	filePathTexture := "data/" + token + "/data_texture.json"

	// Open a file for writing
	// color
	file, err := os.Create(filePathColor)
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

	// texture

	fileTexture, err := os.Create(filePathTexture)
	if err != nil {
		fmt.Println("Error creating fileTexture:", err)
		return
	}
	defer fileTexture.Close()

	// Create an encoder for JSON
	encoderTexture := json.NewEncoder(fileTexture)

	// Encode and write the data to the file
	if err := encoderTexture.Encode(vectorTexture); err != nil {
		fmt.Println("Error encoding data to JSON:", err)
	}

}
