import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganisationCardComponent } from './add-organisation-card.component';

describe('AddOrganisationCardComponent', () => {
    let component: AddOrganisationCardComponent;
    let fixture: ComponentFixture<AddOrganisationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddOrganisationCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddOrganisationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
