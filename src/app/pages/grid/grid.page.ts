import { Component, OnInit } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';
import * as moment from 'moment';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {
  bgHeader = '../../assets/imgs/bg_grille.png';
  date = new Date();
  listAllEvents: any = [];
  listEventsAfterOrdering: any = [];
  listEventsForCurrentMonth: any = [];
  wasClicked: boolean = false;
  thumbnail = "";


  constructor(private radioService: RadioService) { }

  ngOnInit() {
    this.getListGrille();
  }

  onClick() {
    this.wasClicked = !this.wasClicked;
  }


  getListGrille() {

    const filterBy = {
      notreSelection: false,
      alaUne: false,
      idEmission: 0,
      type: "Both",
      date: moment(new Date()).format("YYYY-MM-DD"),
    }
    this.radioService.getPodcasts(filterBy)
      .subscribe((data: any) => {
        if (data) {
          data.forEach((element: any) => {
            element.iconsToggled = false;
            element.month = element.publishingDate.substring(5, 7);
            element.year = element.publishingDate.substring(0, 4);
          });
          this.listAllEvents = data;
          for (let i = 0; i < 24; i++) {
            const current = new Date(this.date.getFullYear(), this.date.getMonth() + i, 1);
            const currentMonth = ("0" + (current.getMonth() + 1)).slice(-2);
            const currentYear = current.getFullYear();
            this.listAllEvents.forEach((item: any) => {
              if (item.month == currentMonth && item.year == currentYear) {
                if (item.emissionMedia.find(x => x.title == "thumbnail")) {
                  this.thumbnail = item.emissionMedia.find(x => x.title == "thumbnail").url
                }
                item.thumbnail = this.thumbnail
                this.listEventsForCurrentMonth.push(item);
              }
            });

            this.listEventsForCurrentMonth.reverse();
            this.listEventsAfterOrdering.push({
              'date': current,
              'month': currentMonth,
              'year': currentYear,
              'elements': this.listEventsForCurrentMonth
            });
            this.listEventsForCurrentMonth = [];
          }
        }
      }, (error: any) => {
        console.log('getListGrille#error', error);
        if (error.status == 401) {
          this.radioService.getToken()
            .subscribe(_ => {
              this.getListGrille();
            });
        }
      });

  }

}
