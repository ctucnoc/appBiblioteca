import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibraryComponent } from './list-library.component';

describe('ListLibraryComponent', () => {
  let component: ListLibraryComponent;
  let fixture: ComponentFixture<ListLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
