import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BigPlayerPageRoutingModule } from './big-player-routing.module';

import { BigPlayerPage } from './big-player.page';

import { PlayerModule } from "../player/player.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BigPlayerPageRoutingModule,
    PlayerModule,
  ],
  declarations: [BigPlayerPage]
})
export class BigPlayerPageModule { }
