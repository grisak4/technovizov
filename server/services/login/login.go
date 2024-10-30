package login

import (
	"log"
	"loginform/models"
	"net/http"

	utilsjwt "loginform/utils/jwt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostLoginUser(c *gin.Context, db *gorm.DB) {
	var userForm models.User

	if err := c.BindJSON(&userForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Fatalf("Error with authorization user: %s", err)
	}

	result := db.Where("username = ? AND password = ?", userForm.Username, userForm.Password).First(&userForm)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid credentials",
			})
			return
		}

		log.Println("User: ", userForm)
		log.Println("Error querying database:", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "database error",
		})
		return
	}

	jwtToken, err := utilsjwt.GenerateJWT(userForm.Username, userForm.Password)
	if err != nil {
		log.Fatalf("Error with generate jwt: %s", err)
		return
	}
	log.Println("jwttoken: ", jwtToken)
	c.JSON(http.StatusOK, gin.H{
		"token": jwtToken,
	})
}
