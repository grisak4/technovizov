package jwt

import (
	"technovizov/config/getconfs/jwtsec"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(user_id uint, login, role string) (string, error) {
	expirationTime := time.Now().Add(60 * time.Minute)
	claims := &Claims{
		User_Id: user_id,
		Login:   login,
		Role:    role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtsec.GetJwt())
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
