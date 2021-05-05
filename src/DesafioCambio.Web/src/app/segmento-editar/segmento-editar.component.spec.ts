import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentoEditarComponent } from './segmento-editar.component';

describe('SegmentoEditarComponent', () => {
  let component: SegmentoEditarComponent;
  let fixture: ComponentFixture<SegmentoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
