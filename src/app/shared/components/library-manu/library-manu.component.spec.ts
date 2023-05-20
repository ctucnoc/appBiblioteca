import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryManuComponent } from './library-manu.component';

describe('LibraryManuComponent', () => {
  let component: LibraryManuComponent;
  let fixture: ComponentFixture<LibraryManuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibraryManuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryManuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
