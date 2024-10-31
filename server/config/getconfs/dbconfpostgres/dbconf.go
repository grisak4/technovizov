package getconfs

import (
	"technovizov/config/confmodels"

	"github.com/spf13/viper"
)

func GetDBConf() confmodels.DBConf {
	return confmodels.DBConf{
		Host:     viper.GetString("database.host"),
		Port:     viper.GetInt("database.port"),
		User:     viper.GetString("database.user"),
		Password: viper.GetString("database.password"),
		DBName:   viper.GetString("database.dbname"),
	}
}
