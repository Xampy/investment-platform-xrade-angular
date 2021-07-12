import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalWidgetFormComponent } from './withdrawal-widget-form.component';

describe('WithdrawalWidgetFormComponent', () => {
  let component: WithdrawalWidgetFormComponent;
  let fixture: ComponentFixture<WithdrawalWidgetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalWidgetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalWidgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
