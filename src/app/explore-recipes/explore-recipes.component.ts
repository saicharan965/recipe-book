import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeApiService } from '../api/recipe-api.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { exploreRecipes } from '../api/api.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['./explore-recipes.component.scss']
})
export class ExploreRecipesComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = true
  private unsubscribe$: Subject<void> = new Subject()
  exploreRecipes!: exploreRecipes[]
  constructor(private apiService: RecipeApiService, private router: Router) { }

  public ngOnInit(): void {
    this.apiService.getExploreRecipes().pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe((exploreRecipes: exploreRecipes[]) => this.exploreRecipes = exploreRecipes)
  }

  protected routeToOtherUsersRecipe(recipeId: any, email: string, oauthId: string) {
    this.router.navigate([`userRecipe/${btoa(recipeId)}/${btoa(email)}/${oauthId}`])
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
