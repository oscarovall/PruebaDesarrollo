import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPersona, Persona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { IParametro } from 'app/shared/model/parametro.model';
import { ParametroService } from 'app/entities/parametro/parametro.service';

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html'
})
export class PersonaUpdateComponent implements OnInit {
  isSaving: boolean;

  tiposIdentificacion = ['Cedula', 'Tarjeta de identidad', 'Pasaporte', 'Contraseña', 'Cedula de extranjería'];

  parametros: IParametro[];

  editForm = this.fb.group({
    id: [],
    nombres: [],
    apellidos: [],
    numeroId: [],
    usuario: [],
    contrasena: [],
    tipoIdentificacion: [],
    edad: [],
    direccion: [],
    telefono: [],
    parametro: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected personaService: PersonaService,
    protected parametroService: ParametroService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);
    });
    this.parametroService
      .query()
      .subscribe((res: HttpResponse<IParametro[]>) => (this.parametros = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(persona: IPersona) {
    this.editForm.patchValue({
      id: persona.id,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      numeroId: persona.numeroId,
      usuario: persona.usuario,
      contrasena: persona.contrasena,
      tipoIdentificacion: persona.tipoIdentificacion,
      edad: persona.edad,
      direccion: persona.direccion,
      telefono: persona.telefono,
      parametro: persona.parametro
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  private createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id']).value,
      nombres: this.editForm.get(['nombres']).value,
      apellidos: this.editForm.get(['apellidos']).value,
      numeroId: this.editForm.get(['numeroId']).value,
      usuario: this.editForm.get(['usuario']).value,
      contrasena: this.editForm.get(['contrasena']).value,
      tipoIdentificacion: this.editForm.get(['tipoIdentificacion']).value,
      edad: this.editForm.get(['edad']).value,
      direccion: this.editForm.get(['direccion']).value,
      telefono: this.editForm.get(['telefono']).value,
      parametro: this.editForm.get(['parametro']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackParametroById(index: number, item: IParametro) {
    return item.id;
  }
}
