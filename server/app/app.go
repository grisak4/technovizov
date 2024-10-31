package app

import (
	"technovizov/config"
	server "technovizov/config/getconfs/servconf"
	dbPostgres "technovizov/db/postgres"
	"technovizov/routes"

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
