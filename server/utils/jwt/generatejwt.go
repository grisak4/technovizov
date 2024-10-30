package jwt

import (
	"loginform/config/getconfs/jwtsec"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(username, password string) (string, error) {
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: username,
		Password: password,
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
