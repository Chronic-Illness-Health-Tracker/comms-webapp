import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCodeModalComponent } from './registration-code-modal.component';

describe('RegistrationCodeModalComponent', () => {
  let component: RegistrationCodeModalComponent;
  let fixture: ComponentFixture<RegistrationCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationCodeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
