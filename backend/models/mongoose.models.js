const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  id: {
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

// Create a Mongoose model using the schema
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
