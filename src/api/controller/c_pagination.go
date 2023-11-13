package controller

import (
	"algeo02/schema"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/rs/zerolog/log"
)

func Pagination(context *gin.Context) {
	// data/:token/:name_file.png
	// data/:token/result.json
	var input schema.PaginationBodyRequest

	// get page
	page, err := strconv.Atoi(context.Param("page"))
	if err != nil {
		log.Err(err).Msg("Error conversion page")
	}

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
	file, err := os.Open("data/" + input.Token + "/result.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	var data map[int][]schema.Result

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"success": true, "page": page, "data": data[page]})

}
