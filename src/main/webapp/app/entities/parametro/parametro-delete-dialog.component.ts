import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParametro } from 'app/shared/model/parametro.model';
import { ParametroService } from './parametro.service';

@Component({
  selector: 'jhi-parametro-delete-dialog',
  templateUrl: './parametro-delete-dialog.component.html'
})
export class ParametroDeleteDialogComponent {
  parametro: IParametro;

  constructor(protected parametroService: ParametroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.parametroService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'parametroListModification',
        content: 'Deleted an parametro'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-parametro-delete-popup',
  template: ''
})
export class ParametroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parametro }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParametroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.parametro = parametro;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/parametro', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/parametro', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
