import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassComponent } from './get-class.component';

describe('GetClassComponent', () => {
  let component: GetClassComponent;
  let fixture: ComponentFixture<GetClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
