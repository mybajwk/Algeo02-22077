package controller

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"

	g "github.com/serpapi/google-search-results-golang"

	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly/v2"
)

func ScrapingImageUrl(c *gin.Context) {
	scrapeURL := "https://solana.com" // Replace with the URL you want to scrape
	outputDir := "images"

	err := os.MkdirAll(outputDir, os.ModePerm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	collector := colly.NewCollector()
	var wg sync.WaitGroup

	collector.OnHTML("img", func(e *colly.HTMLElement) {
		src := e.Request.AbsoluteURL(e.Attr("src"))

		if strings.HasPrefix(src, "data:") {
			return
		}

		if !isImageFile(src) {
			return
		}

		wg.Add(1)
		go func() {
			defer wg.Done()
			err := downloadImage(src, outputDir, "1.png")
			if err != nil {
				log.Printf("Error downloading image: %s\n", err)
			}
		}()
	})

	collector.OnError(func(r *colly.Response, err error) {
		log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	err = collector.Visit(scrapeURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	wg.Wait()
	c.JSON(http.StatusOK, gin.H{"message": "Images scraped successfully"})
}

func ScrapingImageText(context *gin.Context) {

	parameter := map[string]string{
		"q":       "Apple",
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
		err := downloadImage(fmt.Sprintf("%v", (data["thumbnail"])), "images", fileName)
		if err != nil {
			log.Printf("Error downloading image: %s\n", err)
		}
	}

	context.JSON(http.StatusOK, gin.H{"success": true, "data": images_results})
}

func downloadImage(imgURL, outputDir string, fileName string) error {
	resp, err := http.Get(imgURL)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	filePath := filepath.Join(outputDir, fileName)

	if _, err := os.Stat(filePath); err == nil {
		fmt.Printf("Skipped: %s\n", fileName)
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
