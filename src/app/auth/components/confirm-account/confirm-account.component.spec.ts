import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmAccountComponent } from './confirm-account.component';
import { AuthService } from '../../services/auth.service';

describe('ConfirmAccountComponent', () => {
  let component: ConfirmAccountComponent;
  let fixture: ComponentFixture<ConfirmAccountComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['confirmAccount', 'sendAccountConfirmEmail']);
    await TestBed.configureTestingModule({
      declarations: [ConfirmAccountComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
