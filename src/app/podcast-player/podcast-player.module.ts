import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PlayerModule } from "./../player/player.module";
import { PodcastPlayerPageRoutingModule } from "./podcast-player-routing.module";
import { PodcastPlayerPage } from "./podcast-player.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PodcastPlayerPageRoutingModule,
    PlayerModule,
  ],
  declarations: [PodcastPlayerPage],
})
export class PodcastPlayerPageModule {}
