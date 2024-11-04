package routes

import (
	//"loginform/middlewares/auth"
	"technovizov/middlewares/auth"
	"technovizov/middlewares/cors"

	////
	"technovizov/services/auth/login"

	//// reader
	"technovizov/services/reader"
	"technovizov/services/reader/issuebook"

	//// librarian
	"technovizov/services/librarian/authors"
	"technovizov/services/librarian/books"
	"technovizov/services/librarian/issuebooks"
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
		// get
		userRoutes.GET("/getbooks", func(c *gin.Context) {
			books.GetAllBooks(c, db)
		})
		userRoutes.GET("/getbooksgenre/:genre", func(c *gin.Context) {
			books.GetBooksByGenre(c, db)
		})
		userRoutes.GET("/getauthors", func(c *gin.Context) {
			authors.GetAllAuthors(c, db)
		})
		userRoutes.GET("/getlibrarians", func(c *gin.Context) {
			reader.GetAllLibrarians(c, db)
		})

		userRoutes.GET("/getfavorites/:reader_id", func(c *gin.Context) {
			reader.GetAllFavoriteBooks(c, db)
		})
		userRoutes.GET("/gethistory/:reader_id", func(c *gin.Context) {
			reader.GetAllHistoryBooks(c, db)
		})

		// post
		userRoutes.POST("/addfavorite", func(c *gin.Context) {
			reader.PostAddFavorite(c, db)
		})

		userRoutes.POST("/issuebook", func(c *gin.Context) {
			issuebook.PostIssueBook(c, db)
		})
	}

	adminRoutes := router.Group("/librarian")
	adminRoutes.Use(auth.AuthMiddleware([]string{"librarian"}))
	{
		// get
		adminRoutes.GET("/getreaders", func(c *gin.Context) {
			readers.GetAllReaders(c, db)
		})
		adminRoutes.GET("/getreader/:id", func(c *gin.Context) {
			readers.GetReaderByID(c, db)
		})

		adminRoutes.GET("/getbooks", func(c *gin.Context) {
			books.GetAllBooks(c, db)
		})
		adminRoutes.GET("/getbooksgenre/:genre", func(c *gin.Context) {
			books.GetBooksByGenre(c, db)
		})
		adminRoutes.GET("/getbook/:id", func(c *gin.Context) {
			books.GetBookByID(c, db)
		})

		adminRoutes.GET("/getauthors", func(c *gin.Context) {
			authors.GetAllAuthors(c, db)
		})

		adminRoutes.GET("/getissues", func(c *gin.Context) {
			issuebooks.GetIssuesBook(c, db)
		})

		// post
		adminRoutes.POST("/addreader", func(c *gin.Context) {
			readers.PostCreateReader(c, db)
		})
		adminRoutes.POST("/addbook", func(c *gin.Context) {
			books.PostCreateBook(c, db)
		})
		adminRoutes.POST("/addauthor", func(c *gin.Context) {
			authors.PostCreateAuthor(c, db)
		})

		adminRoutes.POST("/issuebooks/:answer", func(c *gin.Context) {
			issuebooks.PostHandleIssueBook(c, db)
		})

		// put
		adminRoutes.PUT("/changereader/:id", func(c *gin.Context) {
			readers.PutEditReader(c, db)
		})
		adminRoutes.PUT("/changebook/:id", func(c *gin.Context) {
			books.PutEditBook(c, db)
		})
		adminRoutes.PUT("/changeauthore/:id", func(c *gin.Context) {
			authors.PutEditAuthor(c, db)
		})

		// delete
		adminRoutes.DELETE("/deletereader/:id", func(c *gin.Context) {
			readers.DeleteReader(c, db)
		})
		adminRoutes.DELETE("/deletebook/:id", func(c *gin.Context) {
			books.DeleteBook(c, db)
		})
		adminRoutes.DELETE("/deleteauthor/:id", func(c *gin.Context) {
			authors.DeleteAuthor(c, db)
		})
	}
}
