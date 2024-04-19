import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUserViewerComponent } from './base-user-viewer.component';

describe('BaseUserViewerComponent', () => {
  let component: BaseUserViewerComponent;
  let fixture: ComponentFixture<BaseUserViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseUserViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseUserViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
