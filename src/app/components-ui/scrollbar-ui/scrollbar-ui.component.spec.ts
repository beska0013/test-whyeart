import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollbarUiComponent } from './scrollbar-ui.component';

describe('ScrollbarUiComponent', () => {
  let component: ScrollbarUiComponent;
  let fixture: ComponentFixture<ScrollbarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ScrollbarUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollbarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
