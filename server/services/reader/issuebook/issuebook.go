package issuebook

import (
	"log"
	"net/http"
	"technovizov/models"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostIssueBook(c *gin.Context, db *gorm.DB) {
	var issueRequest models.IssueBooks
	if err := c.ShouldBindJSON(&issueRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	var reader models.Reader
	if err := db.Where("user_id = ?", issueRequest.ReaderID).Find(&reader).Error; err != nil {
		log.Printf("Reader not found: %d", issueRequest.ReaderID) // Log the missing reader ID
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный идентификатор читателя"})
		return
	}
	// Log the received issue request for debugging
	log.Printf("Received issue request: %+v", issueRequest)

	// Проверка наличия LibrarianID
	var librarian models.Librarian
	if err := db.First(&librarian, issueRequest.LibrarianID).Error; err != nil {
		log.Printf("Librarian not found: %d", issueRequest.LibrarianID) // Log the missing librarian ID
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный идентификатор библиотекаря"})
		return
	}

	// Проверка наличия BookID
	var book models.Book
	if err := db.First(&book, issueRequest.BookID).Error; err != nil {
		log.Printf("Book not found: %d", issueRequest.BookID) // Log the missing book ID
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный идентификатор книги"})
		return
	}

	issueBook := models.IssueBooks{
		ReaderID:    reader.ID,
		LibrarianID: issueRequest.LibrarianID,
		BookID:      issueRequest.BookID,
		Status:      "waiting",
		Reader:      reader,
		Book:        book,
		Librarian:   librarian,
		IssueDate:   time.Now(),
		ReturnDate:  time.Time{}, // установите реальное значение, если нужно
	}

	if err := db.Create(&issueBook).Error; err != nil {
		log.Printf("Database error: %v", err) // Log the database error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при записи в базу данных"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Запрос на выдачу книги отправлен успешно"})
}
