import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConditionCardComponent } from './add-condition-card.component';

describe('AddConditionCardComponent', () => {
  let component: AddConditionCardComponent;
  let fixture: ComponentFixture<AddConditionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConditionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddConditionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
