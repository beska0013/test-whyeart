import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsUiComponent } from './charts-ui.component';

describe('ChartsUiComponent', () => {
  let component: ChartsUiComponent;
  let fixture: ComponentFixture<ChartsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
