package controller

import (
	"fmt"
	"image"
	"math"
	"os"

	"github.com/gin-gonic/gin"
)

func LoadImageAsGrayscale(imagePath string) ([][]uint8, error) {
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
	grayImage := make([][]uint8, bounds.Dy())
	for y := range grayImage {
		grayImage[y] = make([]uint8, bounds.Dx())
		for x := range grayImage[y] {
			originalColor := img.At(x, y)
			r, g, b, _ := originalColor.RGBA()
			gray := uint8(0.299*float64(r<<8) + 0.587*float64(g<<8) + 0.114*float64(b<<8))
			grayImage[y][x] = gray
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
			// matrix[image[y][x+2]][image[y][x]]++
		}
	}
	// normalize
	size := 2 * len(image) * (len(image[0]) - 1)
	print(size)
	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			matrix[i][j] /= float64(size)
		}
	}

	return matrix
}

// GetContrast calculates the contrast of the co-occurrence matrix
func GetContrast(matrix [][]float64) float64 {
	contrast := 0.0
	for i := range matrix {
		for j := range matrix[i] {
			contrast += float64(matrix[i][j]) * float64((i-j)*(i-j))
		}
	}
	return contrast
}

// GetHomogeneity calculates the homogeneity of the co-occurrence matrix
func GetHomogeneity(matrix [][]float64) float64 {
	homogeneity := 0.0
	for i := range matrix {
		for j := range matrix[i] {
			homogeneity += float64(matrix[i][j]) / (1.0 + float64((i-j)*(i-j)))
		}
	}
	return homogeneity
}

// GetEntropy calculates the entropy of the co-occurrence matrix
func GetEntropy(matrix [][]float64) float64 {
	entropy := 0.0
	for i := range matrix {
		for j := range matrix[i] {
			if matrix[i][j] > 0 {
				prob := float64(matrix[i][j])
				entropy -= prob * math.Log2(prob)
			}
		}
	}
	return entropy
}
func CosineSimilarity(vec1, vec2 []float64) float64 {
	var dotProduct, normVec1, normVec2 float64
	for i := range vec1 {
		dotProduct += vec1[i] * vec2[i]
		normVec1 += vec1[i] * vec1[i]
		normVec2 += vec2[i] * vec2[i]
	}
	fmt.Print(dotProduct, " ", normVec1, " ", normVec2, "as ")
	return dotProduct / float64(math.Sqrt(normVec1)*math.Sqrt(normVec2))
}
func S(context *gin.Context) {
	// Load the image as grayscale
	grayImage, err := LoadImageAsGrayscale("brick.png")
	if err != nil {
		panic(err)
	}
	grayImage1, err := LoadImageAsGrayscale("wood.jpg")
	if err != nil {
		panic(err)
	}
	// Calculate co-occurrence matrix
	matrix := GetCoOccurrenceMatrix(grayImage)
	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			fmt.Print(" ", matrix[i][j])
		}
	}
	matrix1 := GetCoOccurrenceMatrix(grayImage1)

	// Calculate texture features
	contrast := GetContrast(matrix)
	homogeneity := GetHomogeneity(matrix)
	entropy := GetEntropy(matrix)
	contrast1 := GetContrast(matrix1)
	homogeneity1 := GetHomogeneity(matrix1)
	entropy1 := GetEntropy(matrix1)

	// Example vector and cosine similarity calculation
	vec1 := []float64{contrast, homogeneity, entropy}
	vec2 := []float64{contrast1, homogeneity1, entropy1} // Example vector
	fmt.Print("\n", vec1, "\n")
	fmt.Print(vec2)
	similarity := CosineSimilarity(vec1, vec2)

	// Output results
	fmt.Printf("Contrast: %f, Homogeneity: %f, Entropy: %f, Similarity: %.10f\n", homogeneity, homogeneity1, entropy, similarity)
}
