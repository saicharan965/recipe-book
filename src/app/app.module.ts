import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: RecipeListComponent },
      { path: 'add', component: AddRecipeComponent },
      { path: 'edit', component: EditRecipeComponent },
      { path: 'delete', component: DeleteRecipeComponent },
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    DeleteRecipeComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
