import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInEditorComponent } from './check-in-editor.component';

describe('CheckInEditorComponent', () => {
  let component: CheckInEditorComponent;
  let fixture: ComponentFixture<CheckInEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckInEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
