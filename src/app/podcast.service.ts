import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PodcastService {
  podcasts: any = [
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
    },
    {
      url:
        "https://mcdn.podbean.com/mf/web/jnwrru/KPMG_FOT_Ep37_-_Responsible_Tax_-_v0574gnb.mp3",
      name: "Future of Tax",
      image:
        "https://pbcdn1.podbean.com/imglogo/image-logo/3569319/Final-Tax-Podcast-Avatar.jpg",
      author: "KPMG Global Tax & Legal",
      summary: "Short podcasts addressing...",
    },
  ];

  getPodcasts() {
    return of(this.podcasts);
  }
}
