import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZonaComponent } from './add-zona.component';

describe('AddZonaComponent', () => {
  let component: AddZonaComponent;
  let fixture: ComponentFixture<AddZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddZonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
