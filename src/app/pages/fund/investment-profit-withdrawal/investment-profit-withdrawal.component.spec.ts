import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentProfitWithdrawalComponent } from './investment-profit-withdrawal.component';

describe('InvestmentProfitWithdrawalComponent', () => {
  let component: InvestmentProfitWithdrawalComponent;
  let fixture: ComponentFixture<InvestmentProfitWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentProfitWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentProfitWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
