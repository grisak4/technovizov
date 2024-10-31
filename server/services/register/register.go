package register

import (
	"log"
	"net/http"
	"technovizov/models"
	"technovizov/utils/dbhelper"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostRegisterNewUser(c *gin.Context, db *gorm.DB) {
	var newUser models.Users
	var newReader models.Readers

	if err := c.ShouldBindJSON(&newUser); err != nil {
		log.Printf("Error with reading user: %s\n", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Create(&newUser).Error; err != nil {
		log.Printf("Error with adding user to db: %s\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := dbhelper.CreateUserWithReader(db, newUser, newReader); err != nil {
		log.Printf("Error with adding user to db: %s\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
	})
}
