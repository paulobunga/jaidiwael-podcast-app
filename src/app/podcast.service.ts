import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PodcastService {
  podcastsTab1: any = [
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
      color: 'blue'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/gh9ry7/FINAL-IWD-podcast.mp3",
      name: "Future of marketing",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog3569319/IWDpic_300x300.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "International Women's Day 2020 - Stories from notable female tax leaders",
      color: 'red'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Carmen Bekker, Partner, KPMG Australia",
      summary: "This global panel discuss the rapidly shifting consumer marketplace, the rise of marketing tech and how the expectation – and role – of marketing",
      color: 'green'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/gh9ry7/FINAL-IWD-podcast.mp3",
      name: "Future of marketing",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog3569319/IWDpic_300x300.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "International Women's Day 2020 - Stories from notable female tax leaders",
      color: 'red'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Carmen Bekker, Partner, KPMG Australia",
      summary: "This global panel discuss the rapidly shifting consumer marketplace, the rise of marketing tech and how the expectation – and role – of marketing",
      color: 'green'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Carmen Bekker, Partner, KPMG Australia",
      summary: "This global panel discuss the rapidly shifting consumer marketplace, the rise of marketing tech and how the expectation – and role – of marketing",
      color: 'green'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/gh9ry7/FINAL-IWD-podcast.mp3",
      name: "Future of marketing",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog3569319/IWDpic_300x300.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "International Women's Day 2020 - Stories from notable female tax leaders",
      color: 'red'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
      color: 'blue'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
      color: 'blue'
    }

  ];

  podcastsTab2: any = [
    {
      url: "https://mcdn.podbean.com/mf/player-preload/g35x9c/04-IFRS-Today-Leases-November18_edited.mp3",
      name: "IFRS Today",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog4225843/IFRS_Today_avatar_hi-res_with_R_mark_v2_300x300.png",
      author: "Partner, KPMG Netherlands",
      summary: "Preparing for IFRS 16, the new leases standard",
      color: 'black'
    },
    {
      url: "https://mcdn.podbean.com/mf/player-preload/g35x9c/04-IFRS-Today-Leases-November18_edited.mp3",
      name: "IFRS Today",
      image:
        "https://pbcdn1.podbean.com/imglogo/ep-logo/pbblog4225843/IFRS_Today_avatar_hi-res_with_R_mark_v2_300x300.png",
      author: "Banking Accounting Advisory Services, KPMG in the UK",
      summary: "Companies are finding that their interactions with crypto-assets are increasing. In this episode",
      color: 'black'
    }
  ]

  podcastsTab3: any = [
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/q2w9pm/Future_of_Marketing_Podcast_FINAL.mp3",
      name: "Customer First",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Insight driven engagement ",
      summary: "we explore the concept of insight driven engagement and how organizations are getting to know their customers at a deep and profound level to help them choreograph motivational experiences.",
      color: 'yellow'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/sk9rd4/Future_of_Service_podcast_FINAL6v7fx.mp3",
      name: "Customer First",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Insight driven engagement ",
      summary: "we explore the concept of insight driven engagement and how organizations are getting to know their customers at a deep and profound level to help them choreograph motivational experiences.",
      color: 'yellow'
    },
    {
      url:
        "https://mcdn.podbean.com/mf/player-preload/b27ih3/Value_of_CX_Podcast_FINALax4dg.mp3",
      name: "Value of customer experience (CX)",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/7700272/Customer_First_Podcast_Cover_1000px_300x300.jpg",
      author: "Insight driven engagement ",
      summary: "This episode of the Customer First podcast brings together a panel from Asia, Europe and North America to examine the true value of customer experience (CX). ",
      color: 'yellow'
    }
  ]

  getPodcasts() {
    return of(this.podcastsTab1);
  }

}
