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
  protected recipes!: Recipe[]
  protected filteredRecipes!: Recipe[]
  private unsubscribe$: Subject<void> = new Subject()
  protected searchTerm!: string

  constructor(private apiService: RecipeApiService) { }
  public ngOnInit(): void {
    this.apiService.getAllRecipes().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes
        this.filteredRecipes = recipes
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
}
