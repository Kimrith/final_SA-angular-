import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenProduct } from './tren-product';

describe('TrenProduct', () => {
  let component: TrenProduct;
  let fixture: ComponentFixture<TrenProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrenProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrenProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
