import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PodcastService {
  podcastsTab1: any = [
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/gh9ry7/FINAL-IWD-podcast.mp3",
      name: "Future of marketing",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog3569319/IWDpic_300x300.jpg",
      author: "KPMG Global Tax & Legal",
      summary:
        "International Women's Day 2020 - Stories from notable female tax leaders",
      color: "red",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Carmen Bekker, Partner, KPMG Australia",
      summary:
        "This global panel discuss the rapidly shifting consumer marketplace, the rise of marketing tech and how the expectation – and role – of marketing",
      color: "green",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/gh9ry7/FINAL-IWD-podcast.mp3",
      name: "Future of marketing",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog3569319/IWDpic_300x300.jpg",
      author: "KPMG Global Tax & Legal",
      summary:
        "International Women's Day 2020 - Stories from notable female tax leaders",
      color: "red",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Carmen Bekker, Partner, KPMG Australia",
      summary:
        "This global panel discuss the rapidly shifting consumer marketplace, the rise of marketing tech and how the expectation – and role – of marketing",
      color: "green",
    },

    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/gh9ry7/FINAL-IWD-podcast.mp3",
      name: "Future of marketing",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog3569319/IWDpic_300x300.jpg",
      author: "KPMG Global Tax & Legal",
      summary:
        "International Women's Day 2020 - Stories from notable female tax leaders",
      color: "red",
    },
  ];

  podcastsTab2: any = [
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/g35x9c/04-IFRS-Today-Leases-November18_edited.mp3",
      name: "IFRS Today",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog4225843/IFRS_Today_avatar_hi-res_with_R_mark_v2_300x300.png",
      author: "Partner, KPMG Netherlands",
      summary: "Preparing for IFRS 16, the new leases standard",
      color: "black",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/g35x9c/04-IFRS-Today-Leases-November18_edited.mp3",
      name: "IFRS Today",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog4225843/IFRS_Today_avatar_hi-res_with_R_mark_v2_300x300.png",
      author: "Banking Accounting Advisory Services, KPMG in the UK",
      summary:
        "Companies are finding that their interactions with crypto-assets are increasing. In this episode",
      color: "black",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Customer First",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Insight driven engagement ",
      summary:
        "we explore the concept of insight driven engagement and how organizations are getting to know their customers at a deep and profound level to help them choreograph motivational experiences.",
      color: "yellow",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/sk9rd4/Future_of_Service_podcast_FINAL6v7fx.mp3",
      name: "Customer First",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Insight driven engagement ",
      summary:
        "we explore the concept of insight driven engagement and how organizations are getting to know their customers at a deep and profound level to help them choreograph motivational experiences.",
      color: "yellow",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/b27ih3/Value_of_CX_Podcast_FINALax4dg.mp3",
      name: "Value of customer experience (CX)",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Insight driven engagement ",
      summary:
        "This episode of the Customer First podcast brings together a panel from Asia, Europe and North America to examine the true value of customer experience (CX). ",
      color: "yellow",
    },
  ];

  radioStations: any = [
    {
      url: "http://144.217.203.226:8316/live",
      name: "Capital FM",
      image:
        "data:image/png;base64,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",
      author: "Capital FM",
      summary: "Capital FM radio stations",
      color: "black",
    },
  ];

  getPodcasts() {
    return of(this.podcastsTab1);
  }

  getRadioStations() {
    return of(this.radioStations);
  }
}
