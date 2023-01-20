import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuningExpComponent } from './runing-exp.component';

describe('RuningExpComponent', () => {
  let component: RuningExpComponent;
  let fixture: ComponentFixture<RuningExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RuningExpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuningExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
