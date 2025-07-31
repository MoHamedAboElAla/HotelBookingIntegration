import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeason } from './edit-season';

describe('EditSeason', () => {
  let component: EditSeason;
  let fixture: ComponentFixture<EditSeason>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSeason]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSeason);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
