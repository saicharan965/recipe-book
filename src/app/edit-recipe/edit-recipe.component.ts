import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeApiService } from '../api/recipe-api.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Recipe } from '../api/api.models';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  protected editRecipeForm!: FormGroup;
  private recipe!: Recipe
  protected isEditing: boolean = false
  protected isLoading: boolean = true
  private unsubscribe$: Subject<void> = new Subject()
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private apiService: RecipeApiService) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editRecipeForm = this.formBuilder.group({
        recipeId: ['', Validators.required],
        title: ['', Validators.required],
        ingredients: [],
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
      this.editRecipeForm.disable();
      const recipeId = params['id']
      if (recipeId) {
        this.apiService.getRecipeById(recipeId).pipe(takeUntil(this.unsubscribe$), finalize(() => {
          this.isLoading = false
        })).subscribe({
          next: (recipe: Recipe) => {
            this.recipe = recipe
            this.populateForm(recipe)
          }
        })
      }
    })
  }

  private populateForm(recipeData: Recipe) {
    this.editRecipeForm.patchValue({
      recipeId: recipeData.recipeId,
      title: recipeData.title,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      preparationTime: recipeData.preparationTime,
      cookingTime: recipeData.cookingTime,
      servings: recipeData.servings,
      calories: recipeData.calories,
      fat: recipeData.fat,
      protein: recipeData.protein,
      carbohydrates: recipeData.carbohydrates,
      cuisine: recipeData.cuisine,
      category: recipeData.category,
      difficulty: recipeData.difficulty,
      thumbnailImage: recipeData.thumbnailImage,
      tags: recipeData.tags.join(', '),
      allergens: recipeData.allergens.join(', '),
    });
  }

  protected onSubmit(): void {
    if (this.editRecipeForm.valid) {
      this.editRecipeForm.controls['ingredients'].patchValue(this.recipe.ingredients)
      console.log(this.editRecipeForm.controls['ingredients'].value)
      this.apiService.updateRecipe(this.editRecipeForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => this.populateForm(res))
    }
  }
  protected toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editRecipeForm.enable();
    } else {
      this.editRecipeForm.disable();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
