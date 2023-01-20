import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RunByIdComponent} from './run-by-id.component';

describe('ExperimentByIdComponent', () => {
  let component: RunByIdComponent;
  let fixture: ComponentFixture<RunByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RunByIdComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RunByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
