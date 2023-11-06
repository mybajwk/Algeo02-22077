package utilities

import (
	"algeo02/initializations"
	"algeo02/schema"
	_ "image/jpeg"
	_ "image/png"
	"sync"
)

func isWithinCombination(hsv schema.HSV, combination schema.Combination) bool {
	return hsv.H >= float64(combination.HRange[0]) && hsv.H <= float64(combination.HRange[1]) &&
		hsv.S >= combination.SRange[0] && hsv.S <= combination.SRange[1] &&
		hsv.V >= combination.VRange[0] && hsv.V <= combination.VRange[1]
}

func GetVector(dataHSV []schema.HSV) []int {
	histogram := make([]int, len(initializations.Combinations))
	var wg sync.WaitGroup
	var mu sync.Mutex

	for _, hsvValue := range dataHSV {
		wg.Add(1)
		go func(hsvValue schema.HSV) {
			defer wg.Done()
			for i, combination := range initializations.Combinations {
				if isWithinCombination(hsvValue, combination) {
					mu.Lock()
					histogram[i]++
					mu.Unlock()
					break
				}
			}
		}(hsvValue)
	}

	wg.Wait()
	return histogram
}
