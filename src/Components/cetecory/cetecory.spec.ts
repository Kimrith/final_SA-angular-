import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cetecory } from './cetecory';

describe('Cetecory', () => {
  let component: Cetecory;
  let fixture: ComponentFixture<Cetecory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cetecory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cetecory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
