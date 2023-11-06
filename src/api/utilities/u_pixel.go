package utilities

import (
	_ "image/jpeg"
	_ "image/png"

	"gonum.org/v1/gonum/mat"
)

// Function to calculate the color vector of an image

func getVector(image *mat.Dense) []float64 {
	hRanges := [][]float64{{158.0, 180.0}, {0.5, 12.5}, {13.0, 20.0}, {20.5, 60.0}, {60.5, 95.0}, {95.5, 135.0}, {135.5, 147.5}, {147.5, 157.5}}
	sRanges := [][]float64{{0, 50.5}, {51.0, 179.0}, {179.5, 255}}
	vRanges := [][]float64{{0, 50.5}, {51.0, 179.0}, {179.5, 255}}

	// Create masks for each range in H, S, and V
	hMasks := make([]*mat.Dense, len(hRanges))
	sMasks := make([]*mat.Dense, len(sRanges))
	vMasks := make([]*mat.Dense, len(vRanges))

	for i, h := range hRanges {
		hMasks[i] = mat.NewDense(image.Dims(), nil)
		mat.With(hMasks[i], func(i, j int, v float64) float64 {
			return mat.Clamp(v, h[0], h[1])
		})
	}

	for i, s := range sRanges {
		sMasks[i] = mat.NewDense(image.Dims(), nil)
		mat.With(sMasks[i], func(i, j int, v float64) float64 {
			return mat.Clamp(v, s[0], s[1])
		})
	}

	for i, v := range vRanges {
		vMasks[i] = mat.NewDense(image.Dims(), nil)
		mat.With(vMasks[i], func(i, j int, v float64) float64 {
			return mat.Clamp(v, v[0], v[1])
		})
	}

	// Compute the histogram by applying masks and combining them
	histogram := make([]*mat.Dense, 0)

	for _, hm := range hMasks {
		for _, sm := range sMasks {
			for _, vm := range vMasks {
				bin := mat.NewDense(image.Dims(), nil)
				bin.Copy(hm)
				bin.MulElem(bin, sm)
				bin.MulElem(bin, vm)
				histogram = append(histogram, bin)
			}
		}
	}

	// Calculate the color vector by summing up the bins of the histogram
	colorVector := make([]float64, len(histogram))

	for i, bin := range histogram {
		sum := mat.Sum(bin)
		colorVector[i] = sum
	}

	return colorVector
}
