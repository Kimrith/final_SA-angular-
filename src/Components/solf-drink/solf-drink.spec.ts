import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolfDrink } from './solf-drink';

describe('SolfDrink', () => {
  let component: SolfDrink;
  let fixture: ComponentFixture<SolfDrink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolfDrink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolfDrink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
