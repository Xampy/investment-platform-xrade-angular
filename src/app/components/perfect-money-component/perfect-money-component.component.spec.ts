import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectMoneyComponentComponent } from './perfect-money-component.component';

describe('PerfectMoneyComponentComponent', () => {
  let component: PerfectMoneyComponentComponent;
  let fixture: ComponentFixture<PerfectMoneyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfectMoneyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfectMoneyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
