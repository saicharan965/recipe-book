import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeApiService } from '../api/recipe-api.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Recipe, exploreRecipes } from '../api/api.models';

@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['./explore-recipes.component.scss']
})
export class ExploreRecipesComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = true
  private unsubscribe$: Subject<void> = new Subject()
  exploreRecipes!: exploreRecipes[]
  constructor(private apiService: RecipeApiService) { }

  public ngOnInit(): void {
    this.apiService.getExploreRecipes().pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe((exploreRecipes: exploreRecipes[]) => this.exploreRecipes = exploreRecipes)
  }
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
