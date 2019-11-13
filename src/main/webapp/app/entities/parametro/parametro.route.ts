import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parametro } from 'app/shared/model/parametro.model';
import { ParametroService } from './parametro.service';
import { ParametroComponent } from './parametro.component';
import { ParametroDetailComponent } from './parametro-detail.component';
import { ParametroUpdateComponent } from './parametro-update.component';
import { ParametroDeletePopupComponent } from './parametro-delete-dialog.component';
import { IParametro } from 'app/shared/model/parametro.model';

@Injectable({ providedIn: 'root' })
export class ParametroResolve implements Resolve<IParametro> {
  constructor(private service: ParametroService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParametro> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((parametro: HttpResponse<Parametro>) => parametro.body));
    }
    return of(new Parametro());
  }
}

export const parametroRoute: Routes = [
  {
    path: '',
    component: ParametroComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parametros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParametroDetailComponent,
    resolve: {
      parametro: ParametroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parametros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParametroUpdateComponent,
    resolve: {
      parametro: ParametroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parametros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParametroUpdateComponent,
    resolve: {
      parametro: ParametroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parametros'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const parametroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParametroDeletePopupComponent,
    resolve: {
      parametro: ParametroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parametros'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
