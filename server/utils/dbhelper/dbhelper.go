package dbhelper

import (
	"errors"
	"log"
	"technovizov/models"

	"gorm.io/gorm"
)

func AddUserId(db *gorm.DB, user *models.User, newReader *models.Reader) error {
	if user.Role == "reader" {
		reader := models.Reader{
			UserID:      user.ID,
			Surname:     newReader.Surname,
			FirstName:   newReader.FirstName,
			Patronymic:  newReader.Address,
			Address:     newReader.Address,
			Phone:       newReader.Phone,
			DateEntry:   newReader.DateEntry,
			LibraryCard: newReader.LibraryCard,
		}
		if err := db.Create(&reader).Error; err != nil {
			log.Printf("Error with database: %s\n", err.Error())
			return err
		}
	} else {
		return errors.New("without role")
	}

	return nil
}
