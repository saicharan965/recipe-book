let recipes = [];

exports.addRecipe = (req, res) => {
  const {
    title,
    ingredients,
    instructions,
    preparationTime,
    cookingTime,
    servings,
    calories,
    fat,
    protein,
    carbohydrates,
    cuisine,
    category,
    difficulty,
    thumbnailImage,
    stepImages,
    tags,
    allergens,
  } = req.body;

  const newRecipe = {
    id: recipes.length + 1,
    title,
    ingredients,
    instructions,
    preparationTime,
    cookingTime,
    servings,
    calories,
    fat,
    protein,
    carbohydrates,
    cuisine,
    category,
    difficulty,
    thumbnailImage,
    stepImages,
    tags,
    ratings: [],
    reviews: [],
    allergens,
  };

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};

exports.getAllRecipes = (req, res) => {
  res.status(200).json(recipes);
};

exports.getRecipeById = (req, res) => {
  const recipeId = parseInt(req.params.id);

  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

exports.deleteRecipe = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const index = recipes.findIndex((recipe) => recipe.id === recipeId);

  if (index !== -1) {
    recipes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

exports.updateRecipe = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const updatedRecipe = req.body;
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId);
  if (recipeIndex !== -1) {
    recipes[recipeIndex] = {
      id: recipeId,
      ...updatedRecipe,
    };
    res.status(200).json(recipes[recipeIndex]);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

exports.addRating = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const { rating } = req.body;
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  if (recipe) {
    recipe.ratings.push(rating);
    const totalRatings = recipe.ratings.reduce((sum, r) => sum + r, 0);
    const averageRating = totalRatings / recipe.ratings.length;
    recipe.averageRating = averageRating;
    res.status(200).json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

exports.addReview = (req, res) => {
  const recipeId = parseInt(req.params.id);
  const { review } = req.body;
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  if (recipe) {
    recipe.reviews.push(review);
    res.status(200).json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};
