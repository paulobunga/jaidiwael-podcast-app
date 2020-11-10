import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PlayerComponent } from "./player.component";

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [PlayerComponent],
})
export class PlayerModule {}
