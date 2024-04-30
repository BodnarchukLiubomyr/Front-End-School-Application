import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTeacherComponent } from './sign-up-teacher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowPasswordDirective } from '../../directives/show-password.directive';
import { AuthService } from '../../services/auth.service';

describe('SignUpTeacherComponent', () => {
  let component: SignUpTeacherComponent;
  let fixture: ComponentFixture<SignUpTeacherComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signUp']);
    await TestBed.configureTestingModule({
      declarations: [
        SignUpTeacherComponent,
        ShowPasswordDirective
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
