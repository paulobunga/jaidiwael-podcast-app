import { AfterViewInit, Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import {
  CANPLAY,
  GET_PODCASTS,
  LOADEDMETADATA,
  LOADSTART,
  PLAYING,
  RESET,
  SET_CURRENT_TRACK,
  TIMEUPDATE,
} from "src/store";
import { AudioService } from "./../audio.service";
import { PodcastService } from "./../podcast.service";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements AfterViewInit {
  podcasts: any = [];
  currentPodcast: any = {};
  state: any = {};

  constructor(
    private podcastService: PodcastService,
    private audioService: AudioService,
    private store: Store<any>,
    public loadingCtrl: LoadingController
  ) {
    this.getPodcasts();
  }
  ngAfterViewInit(): void {
    this.store.select("appState").subscribe((value) => {
      if (value) {
        this.podcasts = value.podcasts;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });
  }

  openPodcast(podcast, index) {
    let currentPodcast = { index, podcast };
    this.store.dispatch({
      type: SET_CURRENT_TRACK,
      payload: { value: currentPodcast },
    });
    this.playStream(podcast.url);
  }

  resetState() {
    this.audioService.stop();
    this.store.dispatch({ type: RESET });
  }

  playStream(url) {
    this.resetState();
    this.audioService.playStream(url).subscribe((event) => {
      const audioObj = event.target;

      switch (event.type) {
        case "canplay":
          return this.store.dispatch({
            type: CANPLAY,
            payload: { value: true },
          });

        case "loadedmetadata":
          return this.store.dispatch({
            type: LOADEDMETADATA,
            payload: {
              value: true,
              data: {
                time: this.audioService.formatTime(
                  audioObj.duration * 1000,
                  "HH:mm:ss"
                ),
                timeSec: audioObj.duration,
                mediaType: "mp3",
              },
            },
          });

        case "playing":
          return this.store.dispatch({
            type: PLAYING,
            payload: { value: true },
          });

        case "pause":
          return this.store.dispatch({
            type: PLAYING,
            payload: { value: false },
          });

        case "timeupdate":
          return this.store.dispatch({
            type: TIMEUPDATE,
            payload: {
              timeSec: audioObj.currentTime,
              time: this.audioService.formatTime(
                audioObj.currentTime * 1000,
                "HH:mm:ss"
              ),
            },
          });

        case "loadstart":
          return this.store.dispatch({
            type: LOADSTART,
            payload: { value: true },
          });
      }
    });
  }

  async getPodcasts() {
    let loader = await this.presentLoader();
    this.podcastService.getRadioStations().subscribe((stations) => {
      //this.podcasts = podcasts;
      this.store.dispatch({
        type: GET_PODCASTS,
        payload: { value: stations },
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
