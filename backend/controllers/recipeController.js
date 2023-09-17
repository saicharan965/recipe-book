const Recipe = require("../models/mongoose.models");

exports.addRecipe = async (req, res) => {
  try {
    const newRecipeData = req.body;
    const newRecipe = new Recipe(newRecipeData);
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.getRecipeById = async (req, res) => {
  const recipeId = parseInt(req.params.id);

  try {
    const recipe = await Recipe.findById(recipeId);

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteRecipe = async (req, res) => {
  const recipeId = parseInt(req.params.id);

  try {
    const deletedRecipe = await Recipe.findByIdAndRemove(recipeId);

    if (deletedRecipe) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRecipe = async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const updatedRecipe = req.body;

  try {
    const updatedRecipeDocument = await Recipe.findByIdAndUpdate(
      recipeId,
      updatedRecipe,
      { new: true }
    );

    if (updatedRecipeDocument) {
      res.status(200).json(updatedRecipeDocument);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addRating = async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const { rating } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (recipe) {
      recipe.ratings.push(rating);
      const totalRatings = recipe.ratings.reduce((sum, r) => sum + r, 0);
      const averageRating = totalRatings / recipe.ratings.length;
      recipe.averageRating = averageRating;
      await recipe.save();

      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addReview = async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const { review } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (recipe) {
      recipe.reviews.push(review);
      await recipe.save();

      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
