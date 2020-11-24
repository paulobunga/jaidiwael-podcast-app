import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-podcast',
  templateUrl: './detail-podcast.component.html',
  styleUrls: ['./detail-podcast.component.scss'],
})
export class DetailPodcastComponent implements OnInit {

  currentPodcast: any;
  wasClicked: boolean = false;
  listExpertPerson: [];
  listInvitedPerson: [];

  constructor(public navParams: NavParams, public modalCtrl: ModalController, ) {
    this.currentPodcast = navParams.get('currentPodcast');
    console.log('this.currentPodcast', this.currentPodcast);

    if (this.currentPodcast.userContents) {
      this.listExpertPerson = this.currentPodcast.userContents.filter((x => x.typeUser === 'Expert' && x.username != ""));
      this.listInvitedPerson = this.currentPodcast.userContents.filter((x => x.typeUser === 'Invité' && x.username != ""));
      console.log('this.listExpertPerson', this.listExpertPerson);
      console.log('this.listInvitedPerson', this.listInvitedPerson);

      // this.listAnimatorPerson = this.currentEmission.userContents.filter((x => x.typeUser === 'Animateur' && x.username !== ""));
    }
  }

  ngOnInit() { }


  onClick() {
    this.wasClicked = !this.wasClicked;
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }


}
