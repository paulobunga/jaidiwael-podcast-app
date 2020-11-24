import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmissionCategoryPageRoutingModule } from './emission-category-routing.module';

import { EmissionCategoryPage } from './emission-category.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayerModule } from "./../player/player.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PlayerModule,
    EmissionCategoryPageRoutingModule
  ],
  declarations: [EmissionCategoryPage]
})
export class EmissionCategoryPageModule { }
