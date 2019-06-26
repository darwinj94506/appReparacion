import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { CreateContratistaPage } from './create-contratista.page';
import { ContratistaService } from 'src/app/services/contratista.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient } from '@angular/common/http';
import {from} from 'rxjs';
describe('CreateContratistaPage', () => {

  let http:HttpClient;
  let component: CreateContratistaPage;
  let servicioUsuario =new UsuarioService(http);
  let contratistaServico=new ContratistaService(http,servicioUsuario);
  let fixture: ComponentFixture<CreateContratistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContratistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContratistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const medicos = ['medico1', 'medico2', 'medico3'];
    spyOn( contratistaServico, 'getPlanes' ).and.callFake( () => {
      return from(medicos );
  });


    component.ngOnInit();

    expect(component).toBeTruthy();
  });
});
