import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Recipe } from '../api/api.models';
import { RecipeApiService } from '../api/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = true
  protected activeTags: string[] = [];
  protected recipes!: Recipe[]
  protected filteredRecipes!: Recipe[]
  protected stars: number[] = [1, 2, 3, 4, 5];
  private unsubscribe$: Subject<void> = new Subject()
  protected searchTerm!: string
  protected filterTags: string[] = []

  constructor(private apiService: RecipeApiService) { }
  public ngOnInit(): void {
    this.apiService.getAllRecipes().pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes
        this.filteredRecipes = recipes
        recipes.forEach(recipe => recipe.tags.forEach(tag => {
          if (!this.filterTags.includes(tag)) this.filterTags.push(tag)
        }))
      },
    })
  }

  protected searchRecipes() {
    this.filteredRecipes = this.recipes.filter(x => x.title.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()))
  }

  protected resetFilters() {
    this.searchTerm = ''
    this.filteredRecipes = this.recipes
  }

  protected clearTags() {
    this.activeTags = []
    this.filteredRecipes = this.recipes
  }

  protected filterRecipesByTag(tag: string) {
    const index = this.activeTags.indexOf(tag);
    if (index !== -1) {
      this.activeTags.splice(index, 1);
    } else {
      this.activeTags.push(tag);
    }
    this.filteredRecipes = this.activeTags.length === 0 ? this.recipes : this.recipes.filter((recipe) => {
      return this.activeTags.some((activeTag) =>
        recipe.tags.includes(activeTag)
      );
    });
  }

  protected deleteRecipe(recipeId: number) {
    this.apiService.deleteRecipe(recipeId).pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe({
      next: (recipes: Recipe[]) => {
      },
    })
  }

  protected rateRecipe(recipeId: number, ratingIndex: number) {
    this.apiService.addRating(recipeId, ratingIndex + 1).pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe({
      next: (res) => {
        console.log(res)
      },
    })
  }


  protected calculateAverageRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRatings / ratings.length;
    return averageRating;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
