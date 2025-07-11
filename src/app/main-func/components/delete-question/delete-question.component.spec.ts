import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionComponent } from './delete-question.component';

describe('DeleteQuestionComponent', () => {
  let component: DeleteQuestionComponent;
  let fixture: ComponentFixture<DeleteQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
