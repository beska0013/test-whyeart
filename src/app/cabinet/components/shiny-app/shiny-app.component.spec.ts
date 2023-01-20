import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinyAppComponent } from './shiny-app.component';

describe('ShinyAppComponent', () => {
  let component: ShinyAppComponent;
  let fixture: ComponentFixture<ShinyAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ShinyAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShinyAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
