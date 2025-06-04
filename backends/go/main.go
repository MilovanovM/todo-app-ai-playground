package main

import (
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// TodoItem represents a todo item in the database
type TodoItem struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Text string `json:"text"`
}

func main() {
	// Create data directory if it doesn't exist
	dataDir := "data"
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		panic("failed to create data directory")
	}

	// Initialize database
	dbPath := filepath.Join(dataDir, "todo.db")
	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&TodoItem{})

	// Initialize Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Get all todos
	r.GET("/todos/", func(c *gin.Context) {
		var todos []TodoItem
		db.Find(&todos)
		c.JSON(http.StatusOK, todos)
	})

	// Create a new todo
	r.POST("/todos/", func(c *gin.Context) {
		var todo TodoItem
		if err := c.ShouldBindJSON(&todo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&todo)
		c.JSON(http.StatusCreated, todo)
	})

	// Delete a todo
	r.DELETE("/todos/:id", func(c *gin.Context) {
		id := c.Param("id")
		idUint, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			return
		}
		db.Delete(&TodoItem{}, idUint)
		c.Status(http.StatusNoContent)
	})

	// Run the server
	r.Run(":8002")
}
