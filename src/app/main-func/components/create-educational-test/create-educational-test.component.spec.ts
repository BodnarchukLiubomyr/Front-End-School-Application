import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducationalTestComponent } from './create-educational-test.component';

describe('CreateEducationalTestComponent', () => {
  let component: CreateEducationalTestComponent;
  let fixture: ComponentFixture<CreateEducationalTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEducationalTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEducationalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
