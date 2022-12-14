package controllers

import (
	"feeds-articles/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateTag(c *gin.Context) {

	var tag *models.Tag

	if err := c.ShouldBindJSON(&tag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": err.Error()})
		return
	}

	if tag.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Name is empty"})
		return
	}

	models.DB.Create(&tag)

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": tag})
}

func GetTag(c *gin.Context) {
	id := c.Param("id")

	var tag models.Tag

	result := models.DB.Find(&tag, id)

	if result.Error != nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true, "data": tag,
	})

}

func UpdateTag(c *gin.Context) {
	id := c.Param("id")

	var tag models.Tag

	result := models.DB.First(&tag)

	if result.Error != nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	// Update the tag properties
	// tag.name = "New"

	models.DB.Save(&tag)

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": tag})
}

func DeleteTag(c *gin.Context) {

	id := c.Param("id")

	var tag models.Tag

	// Find the tag with the given ID
	result := models.DB.Delete(&tag, id)

	if result.Error != nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{"success": true})
}

func GetTags(c *gin.Context) {

	var tags []models.Tag

	result := models.DB.Find(&tags)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to get tags!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": tags})
}
