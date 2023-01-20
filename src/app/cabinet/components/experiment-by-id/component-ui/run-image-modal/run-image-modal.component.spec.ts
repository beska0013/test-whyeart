import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunImageModalComponent } from './run-image-modal.component';

describe('RunImageModalComponent', () => {
  let component: RunImageModalComponent;
  let fixture: ComponentFixture<RunImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RunImageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
