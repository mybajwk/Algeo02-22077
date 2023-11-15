package controller

import (
	"algeo02/schema"
	"algeo02/utilities"
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/go-playground/validator"
	"github.com/rs/zerolog/log"
	g "github.com/serpapi/google-search-results-golang"

	"github.com/gin-gonic/gin"
)

func ScrapingImageUrl(contexts *gin.Context) {

	var input schema.ScrapBodyRequest

	if err := contexts.ShouldBindJSON(&input); err != nil {
		log.Err(err).Msg("Error Bind JSON")
		contexts.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Bind JSON"})
		return
	}
	validator := validator.New()
	if err := validator.Struct(input); err != nil {
		log.Err(err).Msg("Error Validator")
		contexts.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Validator"})
		return
	}
	scrapeURL := input.Text // Replace with the URL you want to scrape
	outputDir := "data/" + input.Token

	err := os.RemoveAll("data/" + input.Token)
	if err != nil {
		log.Err(err).Msg("Error delete folder")

	}

	err = os.MkdirAll(outputDir, os.ModePerm)
	if err != nil {
		contexts.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// collector := colly.NewCollector()
	// collector.Limit(&colly.LimitRule{
	// 	Parallelism: 2,
	// 	RandomDelay: 10 * time.Second,
	// })
	// var wg sync.WaitGroup
	// idx := 1
	// collector.OnHTML("img", func(e *colly.HTMLElement) {
	// 	src := e.Request.AbsoluteURL(e.Attr("src"))

	// 	if strings.HasPrefix(src, "data:") {
	// 		return
	// 	}

	// 	if !isImageFile(src) {
	// 		return
	// 	}

	// 	wg.Add(1)
	// 	go func() {
	// 		defer wg.Done()

	// 		fileName := fmt.Sprintf("/%d.png", idx)
	// 		err := downloadImage(src, outputDir, fileName)
	// 		if err != nil {
	// 			log.Printf("Error downloading image: %s\n", err)
	// 		}
	// 	}()
	// 	idx++
	// })

	// collector.OnError(func(r *colly.Response, err error) {
	// 	log.Err(err).Msgf("Error Request URL")
	// })

	// err = collector.Visit(scrapeURL)
	// if err != nil {
	// 	contexts.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 	return
	// }

	// wg.Wait()
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// Define the URL and a slice to store image URLs
	var imageURLs []string
	err = chromedp.Run(ctx,
		chromedp.Navigate(scrapeURL),
		chromedp.Evaluate(`[...document.images].map(img => img.src)`, &imageURLs),
	)
	if err != nil {
		log.Err(err).Msg("Failed to execute chromedp tasks:")

	}

	// Process each image URL
	for idx, imageURL := range imageURLs {
		fmt.Println("Found image:", imageURL)
		fileName := fmt.Sprintf("/%d.png", idx)
		// Optional: Download the image
		if err := downloadImage(imageURL, outputDir, fileName); err != nil {
			log.Printf("Failed to download image %s: %v\n", imageURL, err)
		}
	}

	time.Sleep(8 * time.Second)

	utilities.GenerateVectorFromFolder(input.Token)
	contexts.JSON(http.StatusOK, gin.H{"success": true})

}

func ScrapingImageText(contexts *gin.Context) {

	var input schema.ScrapBodyRequest

	if err := contexts.ShouldBindJSON(&input); err != nil {
		log.Err(err).Msg("Error Bind JSON")
		contexts.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Bind JSON"})
		return
	}
	validator := validator.New()
	if err := validator.Struct(input); err != nil {
		log.Err(err).Msg("Error Validator")
		contexts.JSON(http.StatusOK, gin.H{"success": false, "message": "Error Validator"})
		return
	}
	outputDir := "data/" + input.Token

	err := os.RemoveAll("data/" + input.Token)
	if err != nil {
		log.Err(err).Msg("Error delete folder")

	}
	err = os.MkdirAll(outputDir, os.ModePerm)
	if err != nil {
		contexts.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	parameter := map[string]string{
		"q":       input.Text,
		"engine":  "google_images",
		"ijn":     "0",
		"api_key": "174f812d2729c1dc5e767a2334de9361e46d7408c50fa8aeb3befa9a33aea545",
	}

	search := g.NewGoogleSearch(parameter, "174f812d2729c1dc5e767a2334de9361e46d7408c50fa8aeb3befa9a33aea545")
	results, _ := search.GetJSON()
	images_results := results["images_results"].([]interface{})

	imagesResults := make([]map[string]interface{}, len(images_results))
	for i, v := range images_results {
		img, ok := v.(map[string]interface{})
		if !ok {
			fmt.Printf("Element at index %d is not a map[string]interface{}\n", i)
			continue
		}
		imagesResults[i] = img
	}

	for idx, data := range imagesResults {
		fileName := fmt.Sprintf("/%d.png", idx)
		err := downloadImage(fmt.Sprintf("%v", (data["thumbnail"])), outputDir, fileName)
		if err != nil {
			log.Err(err).Msg("Error Download Image")

		}
	}

	utilities.GenerateVectorFromFolder(input.Token)

	contexts.JSON(http.StatusOK, gin.H{"success": true})
}

func downloadImage(imgURL, outputDir string, fileName string) error {
	resp, err := http.Get(imgURL)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	filePath := filepath.Join(outputDir, fileName)

	if _, err := os.Stat(filePath); err == nil {
		// fmt.Printf("Skipped: %s\n", fileName)
		return nil
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = io.Copy(file, resp.Body)
	if err != nil {
		return err
	}

	fmt.Printf("Downloaded: %s\n", fileName)
	return nil
}

func isImageFile(url string) bool {
	ext := strings.ToLower(filepath.Ext(url))
	return ext == ".png" || ext == ".jpg" || ext == ".jpeg" || ext == ".gif"
}