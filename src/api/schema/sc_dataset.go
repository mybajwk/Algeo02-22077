package schema

type UploadDataSetBodyRequest struct {
	Base64 string `json:"base64" validate:"required"`
}
