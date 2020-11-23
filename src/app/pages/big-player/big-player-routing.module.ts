import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BigPlayerPage } from './big-player.page';

const routes: Routes = [
  {
    path: '',
    component: BigPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BigPlayerPageRoutingModule {}
