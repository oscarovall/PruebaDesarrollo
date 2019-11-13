import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'parametro',
        loadChildren: () => import('./parametro/parametro.module').then(m => m.PruebaParametroModule)
      },
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.PruebaPersonaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PruebaEntityModule {}
