package controller

import (
	"algeo02/schema"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"math"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/rs/zerolog/log"
	"github.com/signintech/gopdf"
)

func GeneratePDF(context *gin.Context) {
	var input schema.PaginationBodyRequest

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

	// read from file
	file, err := os.Open(filepath.Join("data", input.Token, "result.json"))
	if err != nil {
		log.Err(err).Msg("Error opening file")
		return
	}
	defer file.Close()

	var data map[int][]schema.Result

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		log.Err(err).Msg("Error decoding JSON")
		return
	}

	pdf := gopdf.GoPdf{}
	pdf.Start(gopdf.Config{PageSize: *gopdf.PageSizeA4})
	pdf.AddPage()

	err = pdf.AddTTFFont("arial", "arial.ttf") // Replace with the path to your font file
	if err != nil {
		log.Err(err).Msg("Error adding font")
		return
	}

	err = pdf.SetFont("arial", "", 16)
	if err != nil {
		log.Err(err).Msg("Error setting font")
		return
	}

	x, y := 10.0, 10.0
	_, h := 100.0, 0.0

	for _, arrImgPath := range data {
		for _, imgPath := range arrImgPath {
			title := fmt.Sprintf("Image with similarity %f", imgPath.Similarity*100)
			pdf.SetXY(x, y)
			pdf.Cell(nil, title)
			y += 20

			imagePath := filepath.Join("data", input.Token, fmt.Sprintf("%d.png", imgPath.Name))
			err = pdf.ImageFrom(Convert16BitTo8Bit(imagePath), x, y, &gopdf.Rect{W: 300, H: 300})
			if err != nil {
				log.Err(err).Msg("Error adding image")
				continue
			}

			y += h + 320
			if y > 400-10 {
				pdf.AddPage()
				y = 10
			}
			// imgSize := pdf.GetImageInfo(path)
			// 			// imgHeight := w * imgSize.Height() / imgSize.Width()

			// 			// y += imgHeight + yMargin

			// 			// if y > 297-10 {
			// 			// 	x += w + xMargin
			// 			// 	y = 10
			// 			// 	if x+w > 210 {
			// 			// 		x = 10
			// 			// 	}
			// 			// }
		}
	}

	err = pdf.WritePdf(filepath.Join("data", input.Token, "file.pdf"))
	if err != nil {
		log.Err(err).Msg("Error saving pdf")
	}
}
func Convert16BitTo8Bit(inputPath string) image.Image {
	// Load the 16-bit depth image
	img := loadImage(inputPath)

	// Create a new 8-bit depth image with the same dimensions
	width := img.Bounds().Dx()
	height := img.Bounds().Dy()
	destImg := image.NewRGBA(image.Rect(0, 0, width, height))

	// Conversion: Map 16-bit values to 8-bit values
	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			pixelColor := img.At(x, y)

			// Convert the color to grayscale and then to 8-bit depth
			r, g, b, a := pixelColor.RGBA()
			r8 := uint8(math.Round(float64(r) / 65535 * 255))
			g8 := uint8(math.Round(float64(g) / 65535 * 255))

			b8 := uint8(math.Round(float64(b) / 65535 * 255))
			a8 := uint8(math.Round(float64(a) / 65535 * 255))
			// Set the pixel in the 8-bit image
			destImg.SetRGBA(x, y, color.RGBA{R: r8, G: g8, B: b8, A: a8})
		}
	}

	return destImg
}

func loadImage(filename string) image.Image {
	// Open and decode an image file
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		panic(err)
	}

	return img
}
