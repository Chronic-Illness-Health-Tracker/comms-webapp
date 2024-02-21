import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPreviewTableComponent } from './dashboard-preview-table.component';

describe('DashboardPreviewTableComponent', () => {
  let component: DashboardPreviewTableComponent;
  let fixture: ComponentFixture<DashboardPreviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPreviewTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPreviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
