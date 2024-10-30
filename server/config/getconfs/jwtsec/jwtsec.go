package jwtsec

import (
	"github.com/spf13/viper"
)

func GetJwt() []byte {
	return []byte(viper.GetString("jwt.secret"))
}
