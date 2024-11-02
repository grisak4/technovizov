package authors

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteAuthor(c *gin.Context, db *gorm.DB) {
	var author models.Author

	id := c.Param("id")

	if err := db.Find(&author, id).Error; err != nil {
		log.Printf("error with finding author: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Delete(&author).Error; err != nil {
		log.Printf("error with deleting author: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "succesfully deleted",
	})
}

func PutEditAuthor(c *gin.Context, db *gorm.DB) {
	var author models.Author

	id := c.Param("id")

	if err := db.Find(&author, id).Error; err != nil {
		log.Printf("error with finding author: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	if err := c.ShouldBindJSON(&author); err != nil {
		log.Printf("error with reading author: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Save(&author).Error; err != nil {
		log.Printf("error with saving author: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "succesfully changed",
	})
}

func PostCreateAuthor(c *gin.Context, db *gorm.DB) {
	var author models.Author

	if err := c.BindJSON(&author); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with read user's data: %s\n", err)
		return
	}

	if err := db.Create(&author).Error; err != nil {
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

func GetAllAuthors(c *gin.Context, db *gorm.DB) {
	var authors []models.Author

	if err := db.Find(&authors).Error; err != nil {
		log.Printf("Error with database: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error wtih database",
		})
		return
	}

	c.JSON(http.StatusOK, authors)
}
