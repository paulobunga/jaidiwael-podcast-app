import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PlayerModule } from "../player/player.module";
import { BigPlayerPageRoutingModule } from "./big-player-routing.module";
import { BigPlayerPage } from "./big-player.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BigPlayerPageRoutingModule,
    PlayerModule,
  ],
  declarations: [BigPlayerPage],
})
export class BigPlayerPageModule {}
