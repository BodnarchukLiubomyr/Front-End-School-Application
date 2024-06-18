import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStudentFileComponent } from './get-student-file.component';

describe('GetStudentFileComponent', () => {
  let component: GetStudentFileComponent;
  let fixture: ComponentFixture<GetStudentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStudentFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetStudentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
