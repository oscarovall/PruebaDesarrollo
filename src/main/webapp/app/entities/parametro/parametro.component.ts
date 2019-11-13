import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IParametro } from 'app/shared/model/parametro.model';
import { ParametroService } from './parametro.service';

@Component({
  selector: 'jhi-parametro',
  templateUrl: './parametro.component.html'
})
export class ParametroComponent implements OnInit, OnDestroy {
  parametros: IParametro[];
  eventSubscriber: Subscription;

  constructor(protected parametroService: ParametroService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.parametroService.query().subscribe((res: HttpResponse<IParametro[]>) => {
      this.parametros = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInParametros();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IParametro) {
    return item.id;
  }

  registerChangeInParametros() {
    this.eventSubscriber = this.eventManager.subscribe('parametroListModification', () => this.loadAll());
  }
}
