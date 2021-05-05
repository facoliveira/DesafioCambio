import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentoCadastrarComponent } from './segmento-cadastrar.component';

describe('SegmentoCadastrarComponent', () => {
  let component: SegmentoCadastrarComponent;
  let fixture: ComponentFixture<SegmentoCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentoCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
