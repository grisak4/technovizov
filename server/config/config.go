package config

import (
	"log"

	"github.com/spf13/viper"
)

func InitConfigs() {
	viper.SetConfigName("config") // имя файла конфигурации без расширения
	viper.SetConfigType("yaml")   // тип файла конфигурации
	viper.AddConfigPath(".")      // путь к файлу конфигурации

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}
}
