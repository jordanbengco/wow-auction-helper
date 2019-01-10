import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGroupManagerComponent } from './dashboard-group-manager.component';

describe('DashboardGroupManagerComponent', () => {
  let component: DashboardGroupManagerComponent;
  let fixture: ComponentFixture<DashboardGroupManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGroupManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGroupManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
