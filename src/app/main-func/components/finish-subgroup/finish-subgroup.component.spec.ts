import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSubgroupComponent } from './finish-subgroup.component';

describe('FinishSubgroupComponent', () => {
  let component: FinishSubgroupComponent;
  let fixture: ComponentFixture<FinishSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishSubgroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
