package utilities

import (
	"algeo02/schema"
	_ "image/jpeg"
	_ "image/png"
)

func GetVector(data []schema.HSV) []int {
	hRanges := [][]float64{{316.0, 360.0}, {1.0, 25}, {26.0, 40.0}, {41.0, 120.0}, {121.0, 190.0}, {191.0, 270.0}, {271.0, 295}, {295, 315}}
	sRanges := [][]float64{{0, 0.2}, {0.2, 0.7}, {0.7, 1.01}}
	vRanges := [][]float64{{0, 0.2}, {0.2, 0.7}, {0.7, 1.01}}

	histogram := make([]int, 72)

	for i, h := range hRanges {
		for j, s := range sRanges {
			for k, v := range vRanges {
				for _, hsv := range data {
					if h[0] <= hsv.H && hsv.H <= h[1] &&
						s[0] <= hsv.S && hsv.S < s[1] &&
						v[0] <= hsv.V && hsv.V < v[1] {
						histogram[i*9+j*3+k]++
					}
				}
			}
		}
	}

	return histogram
}
