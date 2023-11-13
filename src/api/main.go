package main

import (
	"algeo02/api"
	"os"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	// init
	// db.Connect()
	api.SetupApiRoute(router)
	var port string = os.Getenv("PORT")

	// activate logging
	// utilities.ActivateLogging()

	if port == "" {
		port = "3000"
	}

	log.Info().Msg("Hello World!")
	log.Info().Msg("Server running on port " + port)
	router.Run(":" + port)

}
