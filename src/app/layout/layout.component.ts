import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  protected isLoggedIn = false
  private unsubscribe$: Subject<void> = new Subject()
  constructor(private authService: AuthService, @Inject(DOCUMENT) public document: Document,) { }

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
  }
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
