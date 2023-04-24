import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubAreaComponent } from './list-sub-area.component';

describe('ListSubAreaComponent', () => {
  let component: ListSubAreaComponent;
  let fixture: ComponentFixture<ListSubAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
