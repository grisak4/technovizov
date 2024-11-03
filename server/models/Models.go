package models

import (
	"time"
)

// Пользователь (User) - базовая информация о пользователе
type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Login    string `gorm:"unique;not null" json:"login"`
	Password string `gorm:"not null" json:"password"`
	Role     string `json:"role"` // reader или librarian

	Librarian *Librarian `gorm:"constraint:OnDelete:CASCADE;" json:"librarian,omitempty"`
	Reader    *Reader    `gorm:"constraint:OnDelete:CASCADE;" json:"reader,omitempty"`
}

// Читатель (Reader) - дополнительная информация для читателя
type Reader struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	UserID        uint           `gorm:"uniqueIndex" json:"user_id"`
	LibraryCard   string         `gorm:"not null" json:"library_card"`
	Surname       string         `gorm:"not null" json:"sur_name"`
	FirstName     string         `gorm:"not null" json:"first_name"`
	Patronymic    string         `json:"patronymic"`
	Address       string         `json:"address"`
	Phone         string         `json:"phone"`
	DateEntry     time.Time      `gorm:"not null" json:"date_entry"`
	IssueBooks    []IssueBooks   `gorm:"foreignKey:ReaderID" json:"issue_books"`    // Связь с выданными книгами
	FavoriteBooks []FavoriteBook `gorm:"foreignKey:ReaderID" json:"favorite_books"` // Связь с избранными книгами
}

// Библиотекарь (Librarian) - дополнительная информация для библиотекаря
type Librarian struct {
	ID         uint         `gorm:"primaryKey" json:"id"`
	UserID     uint         `gorm:"uniqueIndex" json:"user_id"`
	Surname    string       `json:"sur_name"`
	FirstName  string       `json:"first_name"`
	Patronymic string       `json:"patronymic"`
	IssueBooks []IssueBooks `gorm:"foreignKey:LibrarianID" json:"issue_books"` // Связь с выданными книгами
}

// Автор книги (Author) - информация об авторе книги
type Author struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	Pseudonym string `gorm:"not null;unique" json:"pseudonym"`
}

// Книга (Book) - информация о книге
type Book struct {
	ID         uint            `gorm:"primaryKey" json:"id"`
	Title      string          `gorm:"not null;unique" json:"title"`
	AuthorID   uint            `gorm:"not null" json:"author_id"`
	Genre      string          `gorm:"not null" json:"genre"`
	Count      int             `gorm:"not null" json:"count"`
	Popularity *BookPopularity `gorm:"foreignKey:BookID" json:"popularity"`  // Связь с популярностью книги
	IssueBooks []IssueBooks    `gorm:"foreignKey:BookID" json:"issue_books"` // Связь с выданными книгами
}

// Популярность книги (BookPopularity) - отслеживает, сколько раз книга была взята
type BookPopularity struct {
	ID          uint `gorm:"primaryKey" json:"id"`
	BookID      uint `gorm:"unique;not null" json:"book_id"`
	BorrowCount int  `gorm:"not null" json:"borrow_count"` // Количество раз, сколько книгу брали
}

// Выдача книг (IssueBooks) - отслеживает книги, взятые читателями
type IssueBooks struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	ReaderID    uint      `gorm:"not null" json:"reader_id"`
	LibrarianID uint      `gorm:"not null" json:"librarian_id"`
	BookID      uint      `gorm:"not null" json:"book_id"`
	Status      string    `gorm:"not null;default:waiting" json:"status"` // returned or given or waiting or decline
	IssueDate   time.Time `json:"issue_date"`
	ReturnDate  time.Time `json:"return_date"`

	Reader    Reader    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:ReaderID" json:"reader"`
	Librarian Librarian `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:LibrarianID" json:"librarian"`
	Book      Book      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:BookID" json:"book"`
}

// Избранные книги (FavoriteBook) - избранные книги для читателей
type FavoriteBook struct {
	ID       uint `gorm:"primaryKey" json:"id"`
	BookID   uint `gorm:"not null" json:"book_id"`
	ReaderID uint `gorm:"not null" json:"reader_id"`

	Book   Book   `gorm:"foreignKey:BookID" json:"book"`
	Reader Reader `gorm:"foreignKey:ReaderID" json:"reader"`
}

// История выдачи книг
type BooksIssueHistory struct {
	ID       uint `gorm:"primaryKey" json:"id"`
	BookID   uint `gorm:"not null" json:"book_id"`
	ReaderID uint `gorm:"not null" json:"reader_id"`

	Book   Book   `gorm:"foreignKey:BookID" json:"book"`
	Reader Reader `gorm:"foreignKey:ReaderID" json:"reader"`
}
