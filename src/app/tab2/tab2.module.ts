import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PlayerModule } from "./../player/player.module";
import { Tab2PageRoutingModule } from "./tab2-routing.module";
import { Tab2Page } from "./tab2.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlayerModule,
    Tab2PageRoutingModule,
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}
