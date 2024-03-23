import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpDetailsCardComponent } from './gp-details-card.component';

describe('GpDetailsCardComponent', () => {
    let component: GpDetailsCardComponent;
    let fixture: ComponentFixture<GpDetailsCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GpDetailsCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GpDetailsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
