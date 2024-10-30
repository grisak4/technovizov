package app

import (
	"loginform/config"
	server "loginform/config/getconfs/servconf"
	dbPostgres "loginform/db/postgres"
	"loginform/routes"

	"fmt"

	"github.com/gin-gonic/gin"
)

func Run() {
	r := gin.Default()
	gin.SetMode(gin.ReleaseMode)

	config.InitConfigs()

	dbPostgres.ConnectDB()
	defer dbPostgres.CloseDB()

	routes.InitRoutes(r, dbPostgres.GetDB())

	r.Run(fmt.Sprintf("%s:%d",
		server.GetServerConfig().Host, server.GetServerConfig().Port))
}
