import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from './shared/highlight.pipe';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { TokenInterceptor } from '../auth/token.interceptor';
import { environment } from '../env/env.local';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ProfileComponent } from './profile/profile.component';

const ROUTES: Routes = [
  {
    path: '', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: RecipeListComponent },
      { path: 'add', component: AddRecipeComponent },
      { path: 'recipe/:id', component: EditRecipeComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    RecipeListComponent,

    HighlightPipe,
    SpinnerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: `https://${environment.auth.domain}/api/v2/`
      },
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
