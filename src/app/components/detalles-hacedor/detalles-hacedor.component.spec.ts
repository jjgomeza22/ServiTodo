import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesHacedorComponent } from './detalles-hacedor.component';

describe('DetallesHacedorComponent', () => {
  let component: DetallesHacedorComponent;
  let fixture: ComponentFixture<DetallesHacedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesHacedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesHacedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
