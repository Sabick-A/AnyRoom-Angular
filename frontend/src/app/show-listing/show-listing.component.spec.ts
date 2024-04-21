import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListingComponent } from './show-listing.component';

describe('ShowListingComponent', () => {
  let component: ShowListingComponent;
  let fixture: ComponentFixture<ShowListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
