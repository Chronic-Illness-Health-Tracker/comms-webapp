import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateRedirectComponent } from './alternate-redirect.component';

describe('AlternateRedirectComponent', () => {
  let component: AlternateRedirectComponent;
  let fixture: ComponentFixture<AlternateRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternateRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternateRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
