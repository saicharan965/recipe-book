import { environment } from './../../env/env.local';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './api.models';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private apiUrl = environment.apiBaseUrl + '/api';
  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  getExploreRecipes(): Observable<any[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/allRecipes`);
  }

  createOrGetUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/createOrGetUser`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`);
  }

  addRecipe(recipeId: number): Observable<any> {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes`, recipeId);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/recipes/${recipe.recipeId}`, recipe);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<Recipe>(`${this.apiUrl}/recipes/${id}`);
  }

  addReview(id: number, review: string): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/recipes/${id}/reviews`, { review });
  }

  addRating(id: number, rating: number): Observable<any> {
    return this.http.post<number>(`${this.apiUrl}/recipes/${id}/ratings`, { rating });
  }
}
