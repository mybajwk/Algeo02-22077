package utilities

import (
	"algeo02/schema"
	_ "image/jpeg"
	_ "image/png"
)

func GetVector(data []schema.HSV) []int {
	// for color
	hRanges := [][]float64{{316.0, 360.0}, {1.0, 25}, {26.0, 40.0}, {41.0, 120.0}, {121.0, 190.0}, {191.0, 270.0}, {271.0, 295}, {295, 315}}
	sRanges := [][]float64{{0, 0.2}, {0.2, 0.7}, {0.7, 1.01}}
	vRanges := [][]float64{{0, 0.2}, {0.2, 0.7}, {0.7, 1.01}}

	histogram := make([]int, 72)

	rangeMap := make(map[int]int)
	for i := 0; i < len(hRanges); i++ {
		for j := 0; j < len(sRanges); j++ {
			for k := 0; k < len(vRanges); k++ {
				rangeMap[i*9+j*3+k] = 0
			}
		}
	}

	for _, hsv := range data {
		hIndex := -1
		sIndex := -1
		vIndex := -1

		for i, h := range hRanges {
			if h[0] <= hsv.H && hsv.H <= h[1] {
				hIndex = i
				break
			}
		}

		for j, s := range sRanges {
			if s[0] <= hsv.S && hsv.S < s[1] {
				sIndex = j
				break
			}
		}

		for k, v := range vRanges {
			if v[0] <= hsv.V && hsv.V < v[1] {
				vIndex = k
				break
			}
		}

		if hIndex != -1 && sIndex != -1 && vIndex != -1 {
			index := hIndex*9 + sIndex*3 + vIndex
			rangeMap[index]++
		}
	}

	for index, count := range rangeMap {
		histogram[index] = count
	}

	return histogram
}
