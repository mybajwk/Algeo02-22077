package schema

type CheckImageBodyRequest struct {
	Token string `json:"token" validate:"required"`
	Image string `json:"image" validate:"required"`
}
