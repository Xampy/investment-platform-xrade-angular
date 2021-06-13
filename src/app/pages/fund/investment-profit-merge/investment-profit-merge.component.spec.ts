import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentProfitMergeComponent } from './investment-profit-merge.component';

describe('InvestmentProfitMergeComponent', () => {
  let component: InvestmentProfitMergeComponent;
  let fixture: ComponentFixture<InvestmentProfitMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentProfitMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentProfitMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
