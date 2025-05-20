import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEntranceComponent } from './test-entrance.component';

describe('TestEntranceComponent', () => {
  let component: TestEntranceComponent;
  let fixture: ComponentFixture<TestEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEntranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
