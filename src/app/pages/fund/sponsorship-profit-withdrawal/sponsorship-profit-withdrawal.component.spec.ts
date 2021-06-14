import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipProfitWithdrawalComponent } from './sponsorship-profit-withdrawal.component';

describe('SponsorshipProfitWithdrawalComponent', () => {
  let component: SponsorshipProfitWithdrawalComponent;
  let fixture: ComponentFixture<SponsorshipProfitWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipProfitWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipProfitWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
