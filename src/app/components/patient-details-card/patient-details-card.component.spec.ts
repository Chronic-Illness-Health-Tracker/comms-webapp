import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsCardComponent } from './patient-details-card.component';

describe('PatientDetailsCardComponent', () => {
    let component: PatientDetailsCardComponent;
    let fixture: ComponentFixture<PatientDetailsCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientDetailsCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientDetailsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
