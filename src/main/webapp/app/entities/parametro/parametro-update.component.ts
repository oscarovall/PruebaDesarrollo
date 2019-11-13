import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IParametro, Parametro } from 'app/shared/model/parametro.model';
import { ParametroService } from './parametro.service';

@Component({
  selector: 'jhi-parametro-update',
  templateUrl: './parametro-update.component.html'
})
export class ParametroUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    value: []
  });

  constructor(protected parametroService: ParametroService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ parametro }) => {
      this.updateForm(parametro);
    });
  }

  updateForm(parametro: IParametro) {
    this.editForm.patchValue({
      id: parametro.id,
      code: parametro.code,
      value: parametro.value
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const parametro = this.createFromForm();
    if (parametro.id !== undefined) {
      this.subscribeToSaveResponse(this.parametroService.update(parametro));
    } else {
      this.subscribeToSaveResponse(this.parametroService.create(parametro));
    }
  }

  private createFromForm(): IParametro {
    return {
      ...new Parametro(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      value: this.editForm.get(['value']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParametro>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
