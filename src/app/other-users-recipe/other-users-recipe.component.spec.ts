import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUsersRecipeComponent } from './other-users-recipe.component';

describe('OtherUsersRecipeComponent', () => {
  let component: OtherUsersRecipeComponent;
  let fixture: ComponentFixture<OtherUsersRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUsersRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUsersRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
