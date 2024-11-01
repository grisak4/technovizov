package readers

import (
	"log"
	"net/http"
	"technovizov/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteReader(c *gin.Context, db *gorm.DB) {
	var reader models.Reader

	id := c.Param("id")

	if err := db.Find(&reader, id).Error; err != nil {
		log.Printf("error with finding reader: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Delete(&reader).Error; err != nil {
		log.Printf("error with deleting reader: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "succesfully deleted",
	})
}

func PatchEditReader(c *gin.Context, db *gorm.DB) {
	var reader models.Reader

	id := c.Param("id")

	if err := db.Find(&reader, id).Error; err != nil {
		log.Printf("error with finding reader: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	if err := c.ShouldBindJSON(&reader); err != nil {
		log.Printf("error with reading reader: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := db.Save(&reader).Error; err != nil {
		log.Printf("error with saving reader: %s\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "succesfully changed",
	})
}

func PostCreateReader(c *gin.Context, db *gorm.DB) {
	var bookAuthor models.Book

	if err := c.BindJSON(&bookAuthor.Author); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		log.Printf("Error with read user's data: %s\n", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
