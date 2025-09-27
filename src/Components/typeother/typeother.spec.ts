import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typeother } from './typeother';

describe('Typeother', () => {
  let component: Typeother;
  let fixture: ComponentFixture<Typeother>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typeother]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typeother);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
