import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSendingComponent } from './file-sending.component';

describe('FileSendingComponent', () => {
  let component: FileSendingComponent;
  let fixture: ComponentFixture<FileSendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileSendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
