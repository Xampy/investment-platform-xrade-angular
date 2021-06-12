import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeWithdrawRequestPageComponent } from './make-withdraw-request-page.component';

describe('MakeWithdrawRequestPageComponent', () => {
  let component: MakeWithdrawRequestPageComponent;
  let fixture: ComponentFixture<MakeWithdrawRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeWithdrawRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeWithdrawRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
