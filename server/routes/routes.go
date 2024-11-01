package routes

import (
	//"loginform/middlewares/auth"
	"technovizov/middlewares/auth"
	"technovizov/middlewares/cors"

	////
	"technovizov/services/auth/login"
	"technovizov/services/hello"

	//// librarian
	"technovizov/services/librarian/books"
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
		// get
		adminRoutes.GET("/hello", func(c *gin.Context) {
			hello.GetHelloAdmin(c)
		})
		adminRoutes.GET("/getreaders", func(c *gin.Context) {
			readers.GetAllReaders(c, db)
		})

		adminRoutes.GET("/getbooks", func(c *gin.Context) {
			books.GetAllBooks(c, db)
		})
		adminRoutes.GET("/getbooksgenre/:genre", func(c *gin.Context) {
			books.GetBooksByGenre(c, db)
		})

		// post
		adminRoutes.POST("/addreader", func(c *gin.Context) {
			readers.PostCreateReader(c, db)
		})
		adminRoutes.POST("/addbook", func(c *gin.Context) {
			books.PostCreateBook(c, db)
		})

		// patch
		adminRoutes.PATCH("/changereader/:id", func(c *gin.Context) {
			readers.PatchEditReader(c, db)
		})
		adminRoutes.PATCH("/changebook/:id", func(c *gin.Context) {
			books.PatchEditBook(c, db)
		})

		// delete
		adminRoutes.DELETE("/deletereader/:id", func(c *gin.Context) {
			readers.DeleteReader(c, db)
		})
		adminRoutes.DELETE("/deletebook/:id", func(c *gin.Context) {
			books.DeleteBook(c, db)
		})
	}
}
