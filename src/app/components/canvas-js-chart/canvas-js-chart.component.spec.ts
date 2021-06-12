import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasJsChartComponent } from './canvas-js-chart.component';

describe('CanvasJsChartComponent', () => {
  let component: CanvasJsChartComponent;
  let fixture: ComponentFixture<CanvasJsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasJsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasJsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
