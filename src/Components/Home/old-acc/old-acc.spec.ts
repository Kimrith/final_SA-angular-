import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAcc } from './old-acc';

describe('OldAcc', () => {
  let component: OldAcc;
  let fixture: ComponentFixture<OldAcc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldAcc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldAcc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
