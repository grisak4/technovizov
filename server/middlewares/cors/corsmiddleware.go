package cors

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitCors(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},                                       // Разрешённые источники
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},            // Разрешённые методы
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Разрешённые заголовки
		ExposeHeaders:    []string{"Content-Length"},                          // Заголовки, которые могут быть переданы клиенту
		AllowCredentials: true,                                                // Разрешить отправку куков
		MaxAge:           12 * time.Hour,                                      // Время кэширования политики CORS
	}))
}
