import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawReportPageComponent } from './withdraw-report-page.component';

describe('WithdrawReportPageComponent', () => {
  let component: WithdrawReportPageComponent;
  let fixture: ComponentFixture<WithdrawReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
