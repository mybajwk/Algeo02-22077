package schema

type CheckImageBodyRequest struct {
	Token   string `json:"token" validate:"required"`
	Captcha string `json:"captcha" validate:"required"`
	Image   string `json:"image" validate:"required"`
}
