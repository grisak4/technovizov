package reader

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostAddIssueHistory(c *gin.Context, db *gorm.DB) {
	var issueBook models.BooksIssueHistory

	if err := c.BindJSON(&issueBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with read data: %s\n", err)
		return
	}

	if err := db.Create(&issueBook).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		log.Printf("Error with database: %s\n", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

func PostAddFavorite(c *gin.Context, db *gorm.DB) {
	var favBook models.Book

	if err := c.BindJSON(&favBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with read data: %s\n", err)
		return
	}

	if err := db.Create(&favBook).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		log.Printf("Error with database: %s\n", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

func GetAllFavoriteBooks(c *gin.Context, db *gorm.DB) {
	var favBooks []models.FavoriteBook

	readerId := c.Param("reader_id")

	if err := db.Where("reader_id = ?", readerId).Find(&favBooks).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error with database",
		})
		return
	}

	c.JSON(http.StatusOK, favBooks)
}

func GetAllHistoryBooks(c *gin.Context, db *gorm.DB) {
	var booksIssues []models.BooksIssueHistory

	readerId := c.Param("reader_id")

	if err := db.Where("reader_id = ?", readerId).Find(&booksIssues).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error with database",
		})
		return
	}

	c.JSON(http.StatusOK, booksIssues)
}
