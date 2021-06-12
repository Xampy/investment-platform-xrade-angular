import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangeTransactionCodePageComponent } from './profile-change-transaction-code-page.component';

describe('ProfileChangeTransactionCodePageComponent', () => {
  let component: ProfileChangeTransactionCodePageComponent;
  let fixture: ComponentFixture<ProfileChangeTransactionCodePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangeTransactionCodePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangeTransactionCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
