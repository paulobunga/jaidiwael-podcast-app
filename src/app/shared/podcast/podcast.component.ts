import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailPodcastComponent } from '../detail-podcast/detail-podcast.component';

@Component({
  selector: 'app-shared-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent implements OnInit {

  @Input() podcast: any[];
  @Input() state: any;
  @Input() currentPodcast: any;
  @Output() selectPodcast = new EventEmitter<any>();

  constructor(public modalCtrl: ModalController,) { }

  ngOnInit() {
  }



  async showEmission(podcast) {
    const modal = await this.modalCtrl.create({
      component: DetailPodcastComponent,
      componentProps: {
        'currentPodcast': podcast
      },
      cssClass: "modal-display-podcast",
      mode: 'ios'
    });
    return await modal.present();
  }

  sendSlectPodcast(podcast: any) {
    this.selectPodcast.emit(podcast);
  }

}
