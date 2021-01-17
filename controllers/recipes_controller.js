const express = require('express')
const recipes = express.Router()
const Recipe = require("../models/recipe.js")
const recipeSeed = require('../models/recipe_seed.js')

recipes.get('/seed', (req, res) => {
  Recipe.insertMany(recipeSeed, (error, manyRecipes) => {
    res.redirect('/')
  })
    console.log("seeded");
})

recipes.get('/', (req, res) => {
  Recipe.find({}, (error, foundRecipes) => {
      res.json(foundRecipes)
  })
})

recipes.post('/', (req, res) => {
  Recipe.create(req.body, (err, createdRecipe) => {
    Recipe.find({}, (err, foundRecipes) => {
      res.json(foundRecipes)
    })
  })
})

recipes.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      if (err) {
        res.send(err)
      } else {
        Recipe.find({}, (err, foundRecipes) => {
          res.json(foundRecipes)
        })
      }
    }
  )
})

recipes.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    Recipe.find({}, (err, foundRecipes) => {
      res.json(foundRecipes)
    })
  })
})

recipes.get('/dropcollection', (req, res) => {
  Recipe.collection.drop()
  res.redirect('/recipes')
})

module.exports = recipes
