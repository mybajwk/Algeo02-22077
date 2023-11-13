package utilities

import (
	"os"

	"log"
	"path/filepath"
)

func OpenFolder(path string) {
	files, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	// Iterate over the files in the directory
	for _, file := range files {
		if file.IsDir() {
			// Skip directories
			continue
		}

		// Get the file name
		fileName := file.Name()

		// Read the contents of the file
		filePath := filepath.Join(path, fileName)
		file, err := os.Open(filePath)
		if err != nil {
			return
		}
		defer file.Close()

		// command dl sementa

		// pixels, err := getPixels(file)

		// if err != nil {
		// 	fmt.Println("Error: Image could not be decoded")
		// 	os.Exit(1)
		// }

		// fmt.Println(pixels)
	}

}
