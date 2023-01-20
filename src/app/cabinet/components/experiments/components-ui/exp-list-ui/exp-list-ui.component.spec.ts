import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpListUiComponent } from './exp-list-ui.component';

describe('ExpRunsUiComponent', () => {
  let component: ExpListUiComponent;
  let fixture: ComponentFixture<ExpListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExpListUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
