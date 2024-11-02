package issuebooks

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetIssueBook(c *gin.Context, db *gorm.DB) {
	var issuebooks []models.IssueBooks

	if err := db.Find(&issuebooks).Error; err != nil {
		log.Printf("Error with database: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"issues": issuebooks,
	})
}
