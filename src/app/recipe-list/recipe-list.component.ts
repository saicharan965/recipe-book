import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../api/api.models';
import { RecipeApiService } from '../api/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit,OnDestroy{
  protected recipes!: Recipe[]
  private unsubscribe$: Subject<void> = new Subject()
  constructor(private apiService: RecipeApiService) { }
  public ngOnInit(): void {
    this.apiService.getAllRecipes().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
