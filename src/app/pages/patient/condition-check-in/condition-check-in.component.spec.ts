import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionCheckInComponent } from './condition-check-in.component';

describe('ConditionCheckInComponent', () => {
  let component: ConditionCheckInComponent;
  let fixture: ComponentFixture<ConditionCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionCheckInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
