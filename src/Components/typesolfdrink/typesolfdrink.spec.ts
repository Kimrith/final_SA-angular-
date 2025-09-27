import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typesolfdrink } from './typesolfdrink';

describe('Typesolfdrink', () => {
  let component: Typesolfdrink;
  let fixture: ComponentFixture<Typesolfdrink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typesolfdrink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typesolfdrink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
