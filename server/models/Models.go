package models

import (
	"time"
)

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Login    string `gorm:"unique" json:"login"`
	Password string `json:"password"`
	Role     string `json:"role"`

	Librarian *Librarian `gorm:"constraint:OnDelete:CASCADE;"`
	Reader    *Reader    `gorm:"constraint:OnDelete:CASCADE;"`
}

type Reader struct {
	ID          uint      `gorm:"primaryKey"`
	UserID      uint      `gorm:"uniqueIndex"`
	LibraryCard string    `json:"library_card"`
	Surname     string    `json:"sur_name"`
	FirstName   string    `json:"first_name"`
	Patronymic  string    `json:"patronymic"`
	Address     string    `json:"address"`
	Phone       string    `json:"phone"`
	DateEntry   time.Time `json:"data_entry"`

	IssueBooks []IssueBooks `gorm:"foreignKey:ReaderID"` // один ко многим d
}

type Librarian struct {
	ID         uint   `gorm:"primaryKey"`
	UserID     uint   `gorm:"uniqueIndex"`
	Surname    string `json:"sur_name"`
	FirstName  string `json:"first_name"`
	Patronymic string `json:"patronymic"`

	IssueBooks []IssueBooks `gorm:"foreignKey:LibrarianID"` // один ко многим
}

type Book struct {
	ID     uint   `gorm:"primaryKey"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Genre  string `json:"genre"`
	Count  int    `json:"count"`

	IssueBooks []IssueBooks `gorm:"foreignKey:BookID"` // один ко многим
}

type IssueBooks struct {
	ID          uint `gorm:"primaryKey"`
	ReaderID    uint
	LibrarianID uint
	BookID      uint
	IssueDate   time.Time
	ReturnDate  time.Time

	Reader    Reader    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Librarian Librarian `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Book      Book      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
