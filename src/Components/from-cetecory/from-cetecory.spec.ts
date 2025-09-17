import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCetecory } from './from-cetecory';

describe('FromCetecory', () => {
  let component: FromCetecory;
  let fixture: ComponentFixture<FromCetecory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromCetecory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromCetecory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
