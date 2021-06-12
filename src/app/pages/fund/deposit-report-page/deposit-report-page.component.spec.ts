import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositReportPageComponent } from './deposit-report-page.component';

describe('DepositReportPageComponent', () => {
  let component: DepositReportPageComponent;
  let fixture: ComponentFixture<DepositReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
