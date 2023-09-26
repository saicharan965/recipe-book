export interface Recipe {
    recipeId: number;
    title: string;
    ingredients: string[];
    instructions: string;
    preparationTime: string;
    cookingTime: string;
    servings: number;
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    cuisine: string;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    thumbnailImage: string;
    stepImages: string[];
    tags: string[];
    ratings: number[];
    reviews: string[];
    allergens: string[];
}