package issuebooks

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostHandleIssueBook(c *gin.Context, db *gorm.DB) {
	var issuebook models.IssueBooks

	answer := c.Param("answer")

	if err := c.BindJSON(&issuebook); err != nil {
		log.Println("Error with read data: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Model(&models.IssueBooks{}).Where("id = ?", issuebook.ID).Update("status", answer).Error; err != nil {
		log.Println("Error with database: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
}

func GetIssuesBook(c *gin.Context, db *gorm.DB) {
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
