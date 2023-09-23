import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User
  unsubscribe$: Subject<void> = new Subject()
  constructor(private authService: AuthService) { }
  public ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user =>
      this.user = user ? user : undefined)
  }
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
