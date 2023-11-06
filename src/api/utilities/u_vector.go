package utilities

import (
	"algeo02/initializations"
	"algeo02/schema"
	_ "image/jpeg"
	_ "image/png"
)

func isWithinCombination(hsv schema.HSV, combination schema.Combination) bool {
	return hsv.H >= float64(combination.HRange[0]) && hsv.H <= float64(combination.HRange[1]) &&
		hsv.S >= combination.SRange[0] && hsv.S <= combination.SRange[1] &&
		hsv.V >= combination.VRange[0] && hsv.V <= combination.VRange[1]
}

func getVector(dataHSV []schema.HSV) []int {
	histogram := make([]int, 72)

	for _, hsvValue := range dataHSV {
		for i, combination := range initializations.Combinations {
			if isWithinCombination(hsvValue, combination) {
				histogram[i]++
				break // No need check again
			}
		}
	}
	return histogram
}
