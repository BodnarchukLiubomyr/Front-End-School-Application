import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTeacherFileComponent } from './get-teacher-file.component';

describe('GetTeacherFileComponent', () => {
  let component: GetTeacherFileComponent;
  let fixture: ComponentFixture<GetTeacherFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTeacherFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetTeacherFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
