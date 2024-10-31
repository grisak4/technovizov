package readers

import (
	"log"
	"net/http"
	"technovizov/models"
	"technovizov/utils/dbhelper"
	gen "technovizov/utils/genpasslogin"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostCreateReader(c *gin.Context, db *gorm.DB) {
	var newReader models.Reader

	user := models.User{
		Login:    gen.GenerateLogin(),
		Password: gen.GeneratePassword(),
		Role:     "reader",
	}
	if err := db.Create(&user).Error; err != nil {
		log.Printf("Error with user's data: %s\n", err)
	}

	if err := c.BindJSON(&newReader); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with read user's data: %s\n", err)
		return
	}

	if err := dbhelper.AddUserId(db, &user, &newReader); err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

func GetAllReaders(c *gin.Context, db *gorm.DB) {
	var readers []models.Reader

	if err := db.Find(&readers).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error wtih database",
		})
		return
	}

	c.JSON(http.StatusOK, readers)
}
