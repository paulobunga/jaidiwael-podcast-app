import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PodcastsPageRoutingModule } from './podcasts-routing.module';

import { PodcastsPage } from './podcasts.page';

import { SharedModule } from '../../shared/shared.module';
import { PlayerModule } from "./../player/player.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastsPageRoutingModule,
    SharedModule,
    PlayerModule
  ],
  declarations: [PodcastsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PodcastsPageModule { }
