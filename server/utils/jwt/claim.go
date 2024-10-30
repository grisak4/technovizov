package jwt

import "github.com/golang-jwt/jwt"

type Claims struct {
	Login string `json:"login"`
	Role  string `json:"role"`
	jwt.StandardClaims
}
