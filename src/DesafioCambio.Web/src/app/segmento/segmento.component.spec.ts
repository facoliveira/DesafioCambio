import { ComponentFixture, TestBed } from '@angular/core/testing';

import { segmentoComponent } from './segmento.component';

describe('segmentoComponent', () => {
  let component: segmentoComponent;
  let fixture: ComponentFixture<segmentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ segmentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(segmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
