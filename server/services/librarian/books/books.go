package books

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteBook(c *gin.Context, db *gorm.DB) {
	var book models.Book

	id := c.Param("id")

	if err := db.Find(&book, id).Error; err != nil {
		log.Printf("error with finding book: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Delete(&book).Error; err != nil {
		log.Printf("error with deleting book: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "succesfully deleted",
	})
}

func PutEditBook(c *gin.Context, db *gorm.DB) {
	var book models.Book

	id := c.Param("id")

	if err := db.Find(&book, id).Error; err != nil {
		log.Printf("error with finding book: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	if err := c.ShouldBindJSON(&book); err != nil {
		log.Printf("error with reading book: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Save(&book).Error; err != nil {
		log.Printf("error with saving book: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "succesfully changed",
	})
}

func PostCreateBook(c *gin.Context, db *gorm.DB) {
	var newBook models.Book

	if err := c.BindJSON(&newBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with read user's data: %s\n", err)
		return
	}

	if err := db.Create(&newBook).Error; err != nil {
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

func GetAllBooks(c *gin.Context, db *gorm.DB) {
	var books []models.Book

	if err := db.Find(&books).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error wtih database",
		})
		return
	}

	c.JSON(http.StatusOK, books)
}

func GetBooksByGenre(c *gin.Context, db *gorm.DB) {
	var books []models.Book

	genre := c.Param("genre")

	if err := db.Where("genre = ?", genre).Find(&books).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error wtih database",
		})
		return
	}

	c.JSON(http.StatusOK, books)
}
