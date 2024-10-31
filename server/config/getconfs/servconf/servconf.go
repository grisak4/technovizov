package getconfs

import (
	"technovizov/config/confmodels"

	"github.com/spf13/viper"
)

func GetServerConfig() confmodels.ServConf {
	return confmodels.ServConf{
		Host: viper.GetString("server.host"),
		Port: viper.GetInt("server.port"),
	}
}
