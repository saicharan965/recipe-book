import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { RecipeApiService } from '../api/recipe-api.service';
import { Recipe } from '../api/api.models';

@Component({
  selector: 'app-other-users-recipe',
  templateUrl: './other-users-recipe.component.html',
  styleUrls: ['./other-users-recipe.component.scss']
})
export class OtherUsersRecipeComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = true
  protected recipe!: Recipe
  private unsubscribe$: Subject<void> = new Subject()
  constructor(private route: ActivatedRoute, private apisService: RecipeApiService) { }

  public ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe(params => {
      const recipeId = atob(params['id'])
      const userMailId = atob(params['mail'])
      const oauthId = params['oauthId']
      this.apisService.getOtherUsersRecipe(recipeId, userMailId, oauthId).pipe(takeUntil(this.unsubscribe$), finalize(() => this.isLoading = false)).subscribe(res => this.recipe = res)
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
