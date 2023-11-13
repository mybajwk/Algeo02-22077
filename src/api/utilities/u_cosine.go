package utilities

import (
	"math"
)

func CosineSimilarityTexture(vec1, vec2 []float64) float64 {
	dotProduct, normVec1, normVec2 := 0.0, 0.0, 0.0

	for i := range vec1 {
		dotProduct += vec1[i] * vec2[i]
		normVec1 += vec1[i] * vec1[i]
		normVec2 += vec2[i] * vec2[i]
	}

	if normVec1 == 0 || normVec2 == 0 {

		return 0.0
	}

	return dotProduct / (math.Sqrt(normVec1) * math.Sqrt(normVec2))
}

func CosineSimilarityColor(vec1, vec2 []int) float64 {
	dotProduct, normVec1, normVec2 := 0.0, 0.0, 0.0

	for i := range vec1 {
		dotProduct += float64(vec1[i]) * float64(vec2[i])
		normVec1 += float64(vec1[i]) * float64(vec1[i])
		normVec2 += float64(vec2[i]) * float64(vec2[i])
	}

	normVec1 = math.Sqrt(normVec1)
	normVec2 = math.Sqrt(normVec2)

	if normVec1 > 0 && normVec2 > 0 {
		return dotProduct / (normVec1 * normVec2)
	}

	return 0.0
}
