package routes

import (
	//"loginform/middlewares/auth"
	"technovizov/middlewares/auth"
	"technovizov/middlewares/cors"

	////
	"technovizov/services/hello"
	"technovizov/services/librarian/readers"
	"technovizov/services/login"
	"technovizov/services/register"

	////
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitRoutes(router *gin.Engine, db *gorm.DB) {
	cors.InitCors(router)

	// authorization
	router.POST("/register", func(c *gin.Context) {
		register.PostRegisterNewUser(c, db)
	})
	router.POST("/login", func(c *gin.Context) {
		login.PostLoginUser(c, db)
	})

	// routes
	userRoutes := router.Group("/auth")
	userRoutes.Use(auth.AuthMiddleware([]string{"user"}))
	{
		userRoutes.GET("/hello", func(c *gin.Context) {
			hello.GetHelloUser(c)
		})
	}

	adminRoutes := router.Group("/admin")
	adminRoutes.Use(auth.AuthMiddleware([]string{"admin"}))
	{
		//get
		adminRoutes.GET("/hello", func(c *gin.Context) {
			hello.GetHelloAdmin(c)
		})
		adminRoutes.GET("/getreaders", func(c *gin.Context) {
			readers.GetAllReaders(c, db)
		})

		//post
		adminRoutes.POST("/addreader", func(c *gin.Context) {
			readers.PostReaders(c, db)
		})
	}
}
