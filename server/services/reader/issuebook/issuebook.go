package issuebook

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostIssueBook(c *gin.Context, db *gorm.DB) {
	var issuebook models.IssueBooks

	if err := c.BindJSON(&issuebook); err != nil {
		log.Printf("error with read data: %s", err.Error())
		c.JSON(http.StatusNoContent, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Create(&issuebook).Error; err != nil {
		log.Printf("Error with database: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}
