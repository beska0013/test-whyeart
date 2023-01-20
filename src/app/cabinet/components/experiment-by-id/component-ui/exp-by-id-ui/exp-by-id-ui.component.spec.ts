import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpByIdUiComponent } from './exp-by-id-ui.component';

describe('ExpByIdUiComponent', () => {
  let component: ExpByIdUiComponent;
  let fixture: ComponentFixture<ExpByIdUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExpByIdUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpByIdUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
