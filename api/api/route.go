package api

import (
	"algeo02/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupApiRoute(router *gin.Engine) {

	// router.Use(cors.Default())
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	config.AllowHeaders = []string{"Authorization, content-type"}
	router.Use(cors.New(config))
	router.Use(gin.Recovery())

	setupPublicRoute(router)

}

func setupPublicRoute(router *gin.Engine) {
	publicRoutes := router.Group("/image/")

	publicRoutes.POST("/", controller.Check)

}
