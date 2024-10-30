package models

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Login     string `gorm:"unique;not null" json:"login"`
	Password  string `gorm:"unique;not null" json:"password"`
	Role      string `gorm:"not null" json:"role"`
	CreatedAt time.Time
}
