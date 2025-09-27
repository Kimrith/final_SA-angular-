import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typefruit } from './typefruit';

describe('Typefruit', () => {
  let component: Typefruit;
  let fixture: ComponentFixture<Typefruit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typefruit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typefruit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
