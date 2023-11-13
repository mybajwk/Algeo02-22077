package schema

type PaginationBodyRequest struct{
	Token string `json:"token" validate:"required"`
}