import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPartComponent } from './main-part.component';

describe('MainPartComponent', () => {
  let component: MainPartComponent;
  let fixture: ComponentFixture<MainPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
