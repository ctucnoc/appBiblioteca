import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSubAreaComponent } from './search-sub-area.component';

describe('SearchSubAreaComponent', () => {
  let component: SearchSubAreaComponent;
  let fixture: ComponentFixture<SearchSubAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchSubAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
