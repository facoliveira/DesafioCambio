import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoedaEditarComponent } from './moeda-editar.component';

describe('MoedaEditarComponent', () => {
  let component: MoedaEditarComponent;
  let fixture: ComponentFixture<MoedaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoedaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoedaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
