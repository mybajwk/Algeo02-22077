package utilities

import "algeo02/schema"

func ConvertRGBToHSV(r, g, b uint32) schema.HSV {
	// normalisasi rgb
	var result schema.HSV
	rf := float64(r) / 255.0
	gf := float64(g) / 255.0
	bf := float64(b) / 255.0

	// hitung hsv
	max := max(rf, max(gf, bf))
	min := min(rf, min(gf, bf))
	delta := max - min

	var h, s, v float64

	if delta == 0 {
		h = 0
	} else if max == rf {
		temp := (gf - bf) / delta
		temp1 := int(temp) / 6
		h = 60 * (temp - float64(temp1*6))
	} else if max == gf {
		h = 60 * (2 + (bf-rf)/delta)
	} else if max == bf {
		h = 60 * (4 + (rf-gf)/delta)
	}
	// apakah perlu handel h negatif?

	if max == 0 {
		s = 0
	} else {
		s = delta / max
	}

	v = max

	result.H = h
	result.S = s
	result.V = v

	return result

}
