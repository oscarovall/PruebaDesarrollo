import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';

@Component({
  selector: 'jhi-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit, OnDestroy {
  personas: IPersona[];
  eventSubscriber: Subscription;

  constructor(protected personaService: PersonaService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => {
      this.personas = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPersonas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPersona) {
    return item.id;
  }

  registerChangeInPersonas() {
    this.eventSubscriber = this.eventManager.subscribe('personaListModification', () => this.loadAll());
  }
}
