import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBrainBgComponent } from './three-brain-bg.component';

describe('ThreeBrainBgComponent', () => {
  let component: ThreeBrainBgComponent;
  let fixture: ComponentFixture<ThreeBrainBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThreeBrainBgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeBrainBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
