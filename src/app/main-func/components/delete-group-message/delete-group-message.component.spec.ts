import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGroupMessageComponent } from './delete-group-message.component';

describe('DeleteGroupMessageComponent', () => {
  let component: DeleteGroupMessageComponent;
  let fixture: ComponentFixture<DeleteGroupMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGroupMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteGroupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
