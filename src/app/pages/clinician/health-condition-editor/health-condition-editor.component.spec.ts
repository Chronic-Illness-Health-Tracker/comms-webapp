import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthConditionEditorComponent } from './health-condition-editor.component';

describe('HealthConditionEditorComponent', () => {
    let component: HealthConditionEditorComponent;
    let fixture: ComponentFixture<HealthConditionEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HealthConditionEditorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HealthConditionEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
