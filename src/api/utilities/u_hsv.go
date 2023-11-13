package utilities

import "algeo02/schema"

func ConvertRGBToHSV(r, g, b uint32) schema.HSV {
	// normalisasi rgb
	var result schema.HSV
	const divisor = 65535.0
	rf := float64(r) / divisor
	gf := float64(g) / divisor
	bf := float64(b) / divisor

	// hitung hsv
	maks := max(rf, max(gf, bf))
	min := min(rf, min(gf, bf))
	delta := maks - min

	var h, s, v float64

	if delta == 0 {
		h = 0
	} else if maks == rf {
		temp := (gf - bf) / delta
		temp1 := int(temp) / 6
		h = 60 * (temp - float64(temp1*6))
	} else if maks == gf {
		h = 60 * (2 + (bf-rf)/delta)
	} else if maks == bf {
		h = 60 * (4 + (rf-gf)/delta)
	}
	// apakah perlu handel h negatif?

	if maks == 0 {
		s = 0
	} else {
		s = delta / maks
	}

	v = maks

	result.H = h
	result.S = s
	result.V = v

	return result

}
