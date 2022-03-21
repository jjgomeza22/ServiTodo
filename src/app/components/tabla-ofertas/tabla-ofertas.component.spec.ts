import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOfertasComponent } from './tabla-ofertas.component';

describe('TablaOfertasComponent', () => {
  let component: TablaOfertasComponent;
  let fixture: ComponentFixture<TablaOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaOfertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
