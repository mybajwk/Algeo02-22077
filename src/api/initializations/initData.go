package initializations

import "algeo02/schema"

var Combinations []schema.Combination

func InitCombinations() {
	hRanges := [][2]float64{
		{316, 360},
		{0, 25},
		{26, 40},
		{41, 120},
		{121, 190},
		{191, 270},
		{271, 295},
		{295, 315},
	}

	sRanges := [][2]float64{
		{0, 0.2},
		{0.2, 0.7},
		{0.7, 1},
	}

	vRanges := [][2]float64{
		{0, 0.2},
		{0.2, 0.7},
		{0.7, 1},
	}

	for _, hRange := range hRanges {
		for _, sRange := range sRanges {
			for _, vRange := range vRanges {
				combination := schema.Combination{
					HRange: hRange,
					SRange: sRange,
					VRange: vRange,
				}
				Combinations = append(Combinations, combination)
			}
		}
	}
}
