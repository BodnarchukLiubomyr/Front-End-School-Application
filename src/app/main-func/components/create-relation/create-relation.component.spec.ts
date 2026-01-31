import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRelationComponent } from './create-relation.component';

describe('CreateRelationComponent', () => {
  let component: CreateRelationComponent;
  let fixture: ComponentFixture<CreateRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRelationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
