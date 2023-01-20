import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeilisearchComponent } from './meilisearch.component';

describe('MeilisearchComponent', () => {
  let component: MeilisearchComponent;
  let fixture: ComponentFixture<MeilisearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeilisearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeilisearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
