package jwt

import "github.com/golang-jwt/jwt"

type Claims struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	jwt.StandardClaims
}
