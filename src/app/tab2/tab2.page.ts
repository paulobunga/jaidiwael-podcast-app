import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { GET_PODCASTS, RESET, SET_CURRENT_TRACK } from "src/store";
import { AudioService } from "./../audio.service";
import { PodcastService } from "./../podcast.service";
@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  podcasts: any = [];
  currentPodcast: any = {};
  state: any = {};

  constructor(
    private podcastService: PodcastService,
    private audioService: AudioService,
    private store: Store<any>,
    public loadingCtrl: LoadingController
  ) {}
  ionViewWillEnter(): void {
    this.store.select("appState").subscribe((value) => {
      if (value) {
        this.state = value.media;
        this.podcasts = value.podcasts;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });

    this.getPodcasts();
  }

  getImage(podcast) {
    return podcast.contentMedias[
      podcast.contentMedias.findIndex((x) => x.title === "thumbnail")
    ].url;
  }

  getAudio(podcast) {
    return podcast.contentMedias[
      podcast.contentMedias.findIndex((x) => x.title === "mp3")
    ].url;
  }

  openPodcast(podcast, index) {
    if (this.currentPodcast.podcast === podcast) {
      if (this.state.playing) {
        this.audioService.pause();
      } else {
        this.audioService.play();
      }
    } else {
      let currentPodcast = { index, podcast };
      this.store.dispatch({
        type: SET_CURRENT_TRACK,
        payload: { value: currentPodcast },
      });

      this.audioService.playPodcastStream(this.getAudio(podcast));
    }
  }

  pausePodcast() {
    this.audioService.pause();
  }

  resetState() {
    this.audioService.stop();
    this.store.dispatch({ type: RESET });
  }

  async getPodcasts() {
    let loader = await this.presentLoader();
    this.podcastService.getPodcasts().subscribe((podcasts) => {
      //this.podcasts = podcasts;
      this.store.dispatch({
        type: GET_PODCASTS,
        payload: { value: podcasts },
      });
      loader.dismiss();
    });
  }

  async presentLoader() {
    const loading = await this.loadingCtrl.create({
      message: "Loading podcasts. Please wait...",
      duration: 2000,
    });
    await loading.present();
    return loading;
  }
}
