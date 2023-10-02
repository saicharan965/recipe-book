const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.get("/allRecipes", recipeController.getAllUserRecipes);
router.post("/getOtherUsersRecipe", recipeController.getOtherUsersRecipe);
router.post("/createOrGetUser", recipeController.createOrGetUser);

router.post("/recipes", recipeController.addRecipe);

router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:id", recipeController.getRecipeById);

router.delete("/recipes/:id", recipeController.deleteRecipe);

router.put("/recipes/:id", recipeController.updateRecipe);

router.post("/recipes/:id/reviews", recipeController.addReview);
router.post("/recipes/:id/ratings", recipeController.addRating);

module.exports = router;
