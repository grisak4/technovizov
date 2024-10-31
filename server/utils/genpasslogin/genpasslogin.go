package genpasslogin

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"strings"

	"github.com/google/uuid"
)

func GenerateLogin() string {
	return fmt.Sprintf("reader_%s", uuid.New().String()[:6])
}

func GeneratePassword() string {
	length := 8

	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		log.Printf("Error with generate password: %s", err)
		return "-"
	}

	password := base64.StdEncoding.EncodeToString(bytes)
	return strings.TrimRight(password, "=")[:length]
}
