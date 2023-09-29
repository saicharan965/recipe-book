const { Recipe, User, userDetails } = require("../models/mongoose.models");

exports.createOrGetUser = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = req.body;
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
      user.userDetails = userDetails;
      user.recipes = [];
    }
    await user.save();
    res.status(201).json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const userId = req.userId;
    const newRecipeData = req.body;
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }
    const newRecipe = new Recipe(newRecipeData);
    user.recipes.push(newRecipe);
    await Promise.all([user.save(), newRecipe.save()]);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const userId = req.userId;
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
    }
    const recipes = user.recipes;
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.getRecipeById = async (req, res) => {
  const userId = req.userId;
  const recipeId = parseInt(req.params.id);
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipe = user.recipes.find((r) => r.recipeId === recipeId);
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
  const userId = req.userId;
  const recipeId = parseInt(req.params.id);
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipeIndex = user.recipes.findIndex((r) => r.recipeId === recipeId);
    if (recipeIndex !== -1) {
      user.recipes.splice(recipeIndex, 1);
      await user.save();
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
  const userId = req.userId;
  const recipeId = parseInt(req.params.id);
  const updatedRecipe = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipeIndex = user.recipes.findIndex((r) => r.recipeId === recipeId);
    if (recipeIndex !== -1) {
      user.recipes[recipeIndex] = updatedRecipe;
      await user.save();
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUserRecipes = async (req, res) => {
  try {
    const allUsers = await User.find();
    let allRecipes = [];
    if (allUsers.length > 0) {
      allUsers.forEach((x) => {
        if (x.recipes.length > 0)
          x.recipes.forEach((recipe) => {
            allRecipes.push({
              recipe: recipe,
              postedBy: x.userDetails.userMaild,
            });
          });
      });
    }
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addRating = async (req, res) => {
  const userId = req.userId;
  const recipeId = parseInt(req.params.id);
  const { rating } = req.body;
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipeIndex = user.recipes.findIndex((r) => r.recipeId === recipeId);
    if (recipeIndex !== -1) {
      const recipe = user.recipes[recipeIndex];
      recipe.ratings.push(rating);
      const totalRatings = recipe.ratings.reduce((sum, r) => sum + r, 0);
      const averageRating = totalRatings / recipe.ratings.length;
      recipe.averageRating = averageRating;
      await user.save();
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
  const userId = req.userId;
  const recipeId = parseInt(req.params.id);
  const { review } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipeIndex = user.recipes.findIndex((r) => r.recipeId === recipeId);
    if (recipeIndex !== -1) {
      const recipe = user.recipes[recipeIndex];
      recipe.reviews.push(review);
      await user.save();
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
