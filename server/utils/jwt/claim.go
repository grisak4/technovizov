package jwt

import "github.com/golang-jwt/jwt"

type Claims struct {
	User_Id uint   `json:"user_id"`
	Login   string `json:"login"`
	Role    string `json:"role"`
	jwt.StandardClaims
}
