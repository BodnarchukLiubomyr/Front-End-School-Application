import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassStudentsComponent } from './get-class-students.component';

describe('GetClassStudentsComponent', () => {
  let component: GetClassStudentsComponent;
  let fixture: ComponentFixture<GetClassStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetClassStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetClassStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
