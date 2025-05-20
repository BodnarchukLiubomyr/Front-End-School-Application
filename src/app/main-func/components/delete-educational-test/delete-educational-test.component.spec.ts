import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEducationalTestComponent } from './delete-educational-test.component';

describe('DeleteEducationalTestComponent', () => {
  let component: DeleteEducationalTestComponent;
  let fixture: ComponentFixture<DeleteEducationalTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEducationalTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteEducationalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
