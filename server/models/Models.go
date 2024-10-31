package models

import "time"

type Users struct {
	ID        uint      `gorm:"primaryKey"`
	Login     string    `gorm:"unique;not null" json:"login"`
	Password  string    `gorm:"not null" json:"password"`
	Role      string    `gorm:"not null;default:reader" json:"role"`
	CreatedAt time.Time `json:"created_at"`
}

type Readers struct {
	Users
	SurName    string    `json:"surname"`
	FirstName  string    `json:"firstname"`
	Patronymic string    `json:"patronymic"`
	Phone      string    `json:"phone"`
	EntryDate  time.Time `json:"entry_date"`
}

type Books struct {
	ID     uint   `gorm:"primaryKey"`
	Name   string `gorm:"unique" json:"name"`
	Author string `json:"author"`
	Genre  string `json:"genre"`
	Count  int    `json:"count"`
}
