import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedHotels } from './featured-hotels';

describe('FeaturedHotels', () => {
  let component: FeaturedHotels;
  let fixture: ComponentFixture<FeaturedHotels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedHotels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedHotels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
