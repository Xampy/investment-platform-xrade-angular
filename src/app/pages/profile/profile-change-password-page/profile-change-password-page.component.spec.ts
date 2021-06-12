import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangePasswordPageComponent } from './profile-change-password-page.component';

describe('ProfileChangePasswordPageComponent', () => {
  let component: ProfileChangePasswordPageComponent;
  let fixture: ComponentFixture<ProfileChangePasswordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangePasswordPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
