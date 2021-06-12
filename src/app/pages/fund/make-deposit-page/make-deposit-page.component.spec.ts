import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDepositPageComponent } from './make-deposit-page.component';

describe('MakeDepositPageComponent', () => {
  let component: MakeDepositPageComponent;
  let fixture: ComponentFixture<MakeDepositPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDepositPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDepositPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
