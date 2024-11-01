package models

import (
	"time"
)

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Login    string `gorm:"unique;not null" json:"login"`
	Password string `gorm:"unique;not null" json:"password"`
	Role     string `json:"role"`

	Librarian *Librarian `gorm:"constraint:OnDelete:CASCADE;"`
	Reader    *Reader    `gorm:"constraint:OnDelete:CASCADE;"`
}

type Reader struct {
	ID          uint      `gorm:"primaryKey"`
	UserID      uint      `gorm:"uniqueIndex"`
	LibraryCard string    `gorm:"not null" json:"library_card"`
	Surname     string    `gorm:"not null" json:"sur_name"`
	FirstName   string    `gorm:"not null" json:"first_name"`
	Patronymic  string    `gorm:"not null" json:"patronymic"`
	Address     string    `gorm:"not null" json:"address"`
	Phone       string    `gorm:"not null" json:"phone"`
	DateEntry   time.Time `gorm:"not null" json:"data_entry"`

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
	ID     uint   `gorm:"primaryKey" json:"id"`
	Title  string `gorm:"not null;unique" json:"title"`
	Author string `gorm:"not null" json:"author"`
	Genre  string `gorm:"not null" json:"genre"`
	Count  int    `gorm:"not null" json:"count"`

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
