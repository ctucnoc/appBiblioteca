import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEditorialComponent } from './search-editorial.component';

describe('SearchEditorialComponent', () => {
  let component: SearchEditorialComponent;
  let fixture: ComponentFixture<SearchEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchEditorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
