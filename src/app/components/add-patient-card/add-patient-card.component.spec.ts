import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientCardComponent } from './add-patient-card.component';

describe('AddPatientCardComponent', () => {
  let component: AddPatientCardComponent;
  let fixture: ComponentFixture<AddPatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPatientCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
