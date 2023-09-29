const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [String],
  instructions: {
    type: String,
    required: true,
  },
  recipeId: {
    type: Number,
    required: true,
  },
  preparationTime: String,
  cookingTime: String,
  servings: Number,
  calories: Number,
  fat: Number,
  protein: Number,
  carbohydrates: Number,
  cuisine: String,
  category: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  thumbnailImage: String,
  stepImages: [String],
  tags: [String],
  ratings: [Number],
  reviews: [String],
  allergens: [String],
});

const userDetailsSchema = new mongoose.Schema({
  userMaild: String,
  userPhoto: String,
});

const userSchema = new mongoose.Schema({
  userId: String,
  userDetails: userDetailsSchema,
  recipes: [recipeSchema],
});


const Recipe = mongoose.model("Recipe", recipeSchema);
const User = mongoose.model("User", userSchema);
const userDetails = mongoose.model("userDetails", userDetailsSchema);

module.exports = { Recipe, User,userDetails };
