import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionFilterPanelComponent } from './condition-filter-panel.component';

describe('ConditionFilterPanelComponent', () => {
    let component: ConditionFilterPanelComponent;
    let fixture: ComponentFixture<ConditionFilterPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConditionFilterPanelComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConditionFilterPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
