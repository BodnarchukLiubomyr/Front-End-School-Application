import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubgroupsComponent } from './delete-subgroups.component';

describe('DeleteSubgroupsComponent', () => {
  let component: DeleteSubgroupsComponent;
  let fixture: ComponentFixture<DeleteSubgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSubgroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSubgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
