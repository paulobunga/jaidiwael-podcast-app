import { Component, OnInit, NgZone, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RadioService } from 'src/app/services/radio.service';


@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() bgHeader: [];
  @Input() hiddenBackButton: boolean;

  constructor(public modalCtrl: ModalController,
    private radioService: RadioService,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
    console.log('bgHeader', this.bgHeader);
    console.log('hiddenBackButton', this.hiddenBackButton);
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

}
