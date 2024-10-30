package routes

import (
	//"loginform/middlewares/auth"
	"loginform/middlewares/auth"
	"loginform/middlewares/cors"

	////
	"loginform/services/hello"
	"loginform/services/login"
	"loginform/services/register"

	////
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitRoutes(router *gin.Engine, db *gorm.DB) {
	cors.InitCors(router)

	// // test
	// router.GET("/hello", func(c *gin.Context) {
	// 	hello.GetHello(c)
	// })

	// authorization
	router.POST("/register", func(c *gin.Context) {
		register.PostRegisterNewUser(c, db)
	})
	router.POST("/login", func(c *gin.Context) {
		login.PostLoginUser(c, db)
	})

	// auth middleware
	authRoutes := router.Group("/auth")
	authRoutes.Use(auth.AuthMiddleware())
	{
		authRoutes.GET("/hello", func(c *gin.Context) {
			hello.GetHello(c)
		})
	}
}
