import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupMessageComponent } from './update-group-message.component';

describe('UpdateGroupMessageComponent', () => {
  let component: UpdateGroupMessageComponent;
  let fixture: ComponentFixture<UpdateGroupMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGroupMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateGroupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
