package hello

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetHelloUser(c *gin.Context) {
	login, exists := c.Get("login")
	if exists {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, " + login.(string),
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"error": "Unauthorized",
		})
	}
}

func GetHelloAdmin(c *gin.Context) {
	_, exists := c.Get("login")
	if exists {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, Admin!",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"error": "Unauthorized",
		})
	}
}
