package utilities

import (
	"image"
	"math"
	"os"
)

func LoadImageAsGrayscale(imagePath string) ([][][]uint8, error) {
	file, err := os.Open(imagePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		return nil, err
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
			for y := range grayImage {
				grayImage[idx][y] = make([]uint8, w[i+1]-w[i])
				for x := range grayImage[y] {
					originalColor := img.At(h[i]+x, w[i]+y)
					r, g, b, _ := originalColor.RGBA()
					gray := uint8(0.299*float64(r<<8) + 0.587*float64(g<<8) + 0.114*float64(b<<8))
					grayImage[idx][y][x] = gray
				}
			}
			idx++
		}
	}
	return grayImage, nil
}
func GetCoOccurrenceMatrix(image [][]uint8) [][]float64 {
	quantization := 256
	matrix := make([][]float64, quantization)
	for i := range matrix {
		matrix[i] = make([]float64, quantization)
	}

	for y := 0; y < len(image); y++ {
		for x := 0; x < len(image[y])-2; x++ {
			matrix[image[y][x]][image[y][x+2]]++
			matrix[image[y][x+2]][image[y][x]]++
		}
	}
	// normalize
	size := 2 * len(image) * (len(image[0]) - 1)

	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			matrix[i][j] /= float64(size)
		}
	}

	return matrix
}

func GetCHE(matrix [][]float64) []float64 {
	contrast := 0.0
	homogeneity := 0.0
	entropy := 0.0

	for i := range matrix {
		for j := range matrix[i] {
			contrast += float64(matrix[i][j]) * float64((i-j)*(i-j))
			homogeneity += float64(matrix[i][j]) / (1.0 + float64((i-j)*(i-j)))
			if matrix[i][j] > 0 {
				prob := float64(matrix[i][j])
				entropy -= prob * math.Log2(prob)
			}
		}
	}
	return []float64{contrast, homogeneity, entropy}

}
