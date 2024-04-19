import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBarComponent } from './save-bar.component';

describe('SaveBarComponent', () => {
  let component: SaveBarComponent;
  let fixture: ComponentFixture<SaveBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
