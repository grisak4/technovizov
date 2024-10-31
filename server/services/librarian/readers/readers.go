package readers

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostReaders(c *gin.Context, db *gorm.DB) {
	var newReader models.Readers

	if err := c.BindJSON(&newReader); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with authorization user: %s\n", err)
		return
	}

	if err := db.Create(&newReader).Error; err != nil {
		log.Printf("Error with creating reader: %s\n", err.Error())
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
	var readers []models.Readers

	if err := db.Find(&readers).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error wtih database",
		})
		return
	}

	c.JSON(http.StatusOK, readers)
}
