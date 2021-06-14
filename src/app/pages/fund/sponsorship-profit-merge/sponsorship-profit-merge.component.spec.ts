import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipProfitMergeComponent } from './sponsorship-profit-merge.component';

describe('SponsorshipProfitMergeComponent', () => {
  let component: SponsorshipProfitMergeComponent;
  let fixture: ComponentFixture<SponsorshipProfitMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipProfitMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipProfitMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
