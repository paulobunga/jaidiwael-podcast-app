import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'podcasts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../podcasts/podcasts.module').then(m => m.PodcastsPageModule)
          }
        ]
      },
       {
        path: 'live',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../live/live.module').then(m => m.LivePageModule)
          }
        ]
      },
      {
        path: 'radio',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../radio/radio.module').then(m => m.RadioPageModule)
          }
        ]
      },
      {
        path: 'grille',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../grid/grid.module').then(m => m.GridPageModule)
          }
        ]
      }, 
      {
        path: '',
        redirectTo: '/tabs/podcasts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/podcasts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
