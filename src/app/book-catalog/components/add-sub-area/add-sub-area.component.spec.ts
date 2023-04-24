import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubAreaComponent } from './add-sub-area.component';

describe('AddSubAreaComponent', () => {
  let component: AddSubAreaComponent;
  let fixture: ComponentFixture<AddSubAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
