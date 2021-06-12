import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDepositRequestPageComponent } from './make-deposit-request-page.component';

describe('MakeDepositRequestPageComponent', () => {
  let component: MakeDepositRequestPageComponent;
  let fixture: ComponentFixture<MakeDepositRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDepositRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDepositRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
