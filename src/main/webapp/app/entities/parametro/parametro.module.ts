import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaSharedModule } from 'app/shared/shared.module';
import { ParametroComponent } from './parametro.component';
import { ParametroDetailComponent } from './parametro-detail.component';
import { ParametroUpdateComponent } from './parametro-update.component';
import { ParametroDeletePopupComponent, ParametroDeleteDialogComponent } from './parametro-delete-dialog.component';
import { parametroRoute, parametroPopupRoute } from './parametro.route';

const ENTITY_STATES = [...parametroRoute, ...parametroPopupRoute];

@NgModule({
  imports: [PruebaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParametroComponent,
    ParametroDetailComponent,
    ParametroUpdateComponent,
    ParametroDeleteDialogComponent,
    ParametroDeletePopupComponent
  ],
  entryComponents: [ParametroDeleteDialogComponent]
})
export class PruebaParametroModule {}
