package controller

import (
	"algeo02/schema"
	"algeo02/utilities"
	"bytes"
	"encoding/base64"
	"image"
	_ "image/jpeg"
	"image/png"

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
	rgbMatrix := make([][]schema.HSV, height)

	for y := 0; y < height; y++ {
		rgbMatrix[y] = make([]schema.HSV, width)
		for x := 0; x < width; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			rgbMatrix[y][x] = utilities.ConvertRGBToHSV(r, g, b)
		}
	}
	context.JSON(http.StatusOK, gin.H{"success": true, "data": ""})
}
