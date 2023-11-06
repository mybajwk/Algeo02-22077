package main

import (
	"algeo02/api"
	"algeo02/initializations"
	"os"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	// init
	initializations.InitCombinations()
	// db.Connect()
	api.SetupApiRoute(router)
	var port string = os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}
	router.Run(":" + port)
	log.Info().Msg("Server running on port " + port)

}
