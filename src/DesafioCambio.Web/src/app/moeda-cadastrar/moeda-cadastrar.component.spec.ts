import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoedaCadastrarComponent } from './moeda-cadastrar.component';

describe('MoedaCadastrarComponent', () => {
  let component: MoedaCadastrarComponent;
  let fixture: ComponentFixture<MoedaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoedaCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoedaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
