import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatusTableComponent } from './patient-status-table.component';

describe('PatientStatusTableComponent', () => {
  let component: PatientStatusTableComponent;
  let fixture: ComponentFixture<PatientStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientStatusTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
