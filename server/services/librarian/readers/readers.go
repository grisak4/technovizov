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

func PutEditReader(c *gin.Context, db *gorm.DB) {
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
