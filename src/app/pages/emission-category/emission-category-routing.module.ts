import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmissionCategoryPage } from './emission-category.page';

const routes: Routes = [
  {
    path: '',
    component: EmissionCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmissionCategoryPageRoutingModule {}
