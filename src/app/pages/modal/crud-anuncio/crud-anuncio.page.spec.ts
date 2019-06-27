import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAnuncioPage } from './crud-anuncio.page';

describe('CrudAnuncioPage', () => {
  let component: CrudAnuncioPage;
  let fixture: ComponentFixture<CrudAnuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAnuncioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
