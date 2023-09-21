import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../api/api.models';
import { RecipeApiService } from '../api/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = true
  protected recipes!: Recipe[]
  protected filteredRecipes!: Recipe[]
  protected stars: number[] = [1, 2, 3, 4, 5];
  private unsubscribe$: Subject<void> = new Subject()
  protected searchTerm!: string

  constructor(private apiService: RecipeApiService) { }
  public ngOnInit(): void {
    this.apiService.getAllRecipes().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes
        this.filteredRecipes = recipes
        this.isLoading = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  protected searchRecipes() {
    this.filteredRecipes = this.recipes.filter(x => x.title.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()))
  }

  protected resetFilters() {
    this.searchTerm = ''
    this.filteredRecipes = this.recipes
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  protected calculateAverageRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRatings / ratings.length;
    return averageRating;
  }
}
