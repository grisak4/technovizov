package routes

import (
	//"loginform/middlewares/auth"
	"technovizov/middlewares/auth"
	"technovizov/middlewares/cors"

	////
	"technovizov/services/auth/login"
	"technovizov/services/hello"
	"technovizov/services/librarian/readers"

	////
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitRoutes(router *gin.Engine, db *gorm.DB) {
	cors.InitCors(router)

	// authorization
	router.POST("/login", func(c *gin.Context) {
		login.PostLoginUser(c, db)
	})

	// routes
	userRoutes := router.Group("/reader")
	userRoutes.Use(auth.AuthMiddleware([]string{"reader"}))
	{
		userRoutes.GET("/hello", func(c *gin.Context) {
			hello.GetHelloUser(c)
		})
	}

	adminRoutes := router.Group("/librarian")
	adminRoutes.Use(auth.AuthMiddleware([]string{"librarian"}))
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
			readers.PostCreateReader(c, db)
		})
	}
}
