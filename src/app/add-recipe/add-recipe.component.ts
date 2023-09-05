import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RecipeApiService } from '../api/recipe-api.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  protected recipeForm!: FormGroup
  constructor(private fb: FormBuilder, private apiService:RecipeApiService) {
    this.recipeForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      ingredients: [[]],
      instructions: ['', Validators.required],
      preparationTime: ['', Validators.required],
      cookingTime: ['', Validators.required],
      servings: ['', Validators.required],
      calories: ['', Validators.required],
      fat: ['', Validators.required],
      protein: ['', Validators.required],
      carbohydrates: ['', Validators.required],
      cuisine: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      thumbnailImage: [''],
      stepImages: [[]],
      tags: [[]],
      allergens: [[]],
    });
  }

  protected addRecipe() {
      const formData = this.formatFormData(this.recipeForm.value);
      this.apiService.addRecipe(formData).subscribe((res)=>{
        console.log(res)
      })
  }

  private formatFormData(formData: any): any {
    const formattedRecipe = {
      id: formData.id,
      title: formData.title,
      ingredients: formData.ingredients.split(',').map((ingredient: string) => ingredient.trim()),
      instructions: formData.instructions,
      preparationTime: formData.preparationTime,
      cookingTime: formData.cookingTime,
      servings: +formData.servings,
      calories: +formData.calories,
      fat: +formData.fat,
      protein: +formData.protein,
      carbohydrates: +formData.carbohydrates,
      cuisine: formData.cuisine,
      category: formData.category,
      difficulty: formData.difficulty,
      thumbnailImage: formData.thumbnailImage,
      stepImages: formData.stepImages.split(',').map((image: string) => image.trim()),
      tags: formData.tags.split(',').map((tag: string) => tag.trim()),
      ratings: [],
      reviews: [],
      allergens: formData.allergens.split(',').map((allergen: string) => allergen.trim()),
    };

    return formattedRecipe;
  }
}
