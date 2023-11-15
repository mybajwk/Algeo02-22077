package schema

type ScrapBodyRequest struct {
	Token   string `json:"token" validate:"required"`
	Captcha string `json:"captcha" validate:"required"`
	Text    string `json:"text" validate:"required"`
}
