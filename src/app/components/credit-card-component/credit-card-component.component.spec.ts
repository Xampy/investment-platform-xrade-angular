import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardComponentComponent } from './credit-card-component.component';

describe('CreditCardComponentComponent', () => {
  let component: CreditCardComponentComponent;
  let fixture: ComponentFixture<CreditCardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
