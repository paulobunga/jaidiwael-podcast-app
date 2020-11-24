import { Component, OnInit } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';
import * as moment from 'moment';
@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {
  listEmissionLive: any;
  bgHeader = "../../assets/imgs/bg_podcastAcceuil.png";
  constructor(private radioService: RadioService) {
  }

  ngOnInit() {
    // this.getListEmission();
  }

  /* getListEmission() {
    let date = Date.now();
    const payload = {
      date: moment(date).format("YYYY-MM-DD"),
      type: "Direct",
      notreSelection: false,
      alaUne: false,
      idEmission: 0
    }

    this.podcastService.getListEmission(payload).subscribe(res => {
      this.listEmissionLive = res;
      console.log('this.listEmissionLive', this.listEmissionLive);
    }, error => {
      console.log('error', error);
    });
  } */



}
