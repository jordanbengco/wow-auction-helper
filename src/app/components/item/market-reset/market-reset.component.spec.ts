import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketResetComponent } from './market-reset.component';

fdescribe('MarketResetComponent', () => {
  let component: MarketResetComponent;
  let fixture: ComponentFixture<MarketResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTargetMVPrice', () => {});

  describe('isMinimumProfitPercentMatch', () => {});

  describe('isTargetPriceMatch', () => {});

  describe('isCountMatch', () => {});

  describe('isMaxCostMatch', () => {});
});
