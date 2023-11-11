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
	setupStaticRoute(router)

}
func setupStaticRoute(router *gin.Engine) {
	router.Static("/media", "./data")
}

func setupPublicRoute(router *gin.Engine) {
	publicRoutes := router.Group("/image/")

	publicRoutes.POST("/", controller.Check)
	publicRoutes.POST("/upload-color", controller.UploadDataSetColor)
	publicRoutes.POST("/a", controller.S)
	// publicRoutes.POST("/upload-data", controller.UploadDataSet)

}
