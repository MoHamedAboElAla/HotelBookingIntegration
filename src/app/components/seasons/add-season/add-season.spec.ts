import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeason } from './add-season';

describe('AddSeason', () => {
  let component: AddSeason;
  let fixture: ComponentFixture<AddSeason>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSeason]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSeason);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
