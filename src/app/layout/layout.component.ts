import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { EMPTY, Subject, takeUntil } from 'rxjs';
import { RecipeApiService } from '../api/recipe-api.service';
import { UserDetails } from '../api/api.models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  protected isLoggedIn = false
  user?: User
  private unsubscribe$: Subject<void> = new Subject()
  constructor(private authService: AuthService, @Inject(DOCUMENT) public document: Document, private apiService: RecipeApiService) {

  }

  protected logout() {
    this.authService.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  public ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      this.isLoggedIn = value
      if (value !== true) {
        this.authService.loginWithRedirect()
      }
    })
    this.authService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      this.user = user ? user : undefined
      const userDetails: UserDetails = { userMaild: user?.email, userPhoto: user?.picture }
      this.apiService.createOrGetUser(userDetails).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: () => EMPTY,
        error: (err) => console.log(err)
      })
    }
    )
  }
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
