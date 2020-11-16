import { Component } from "@angular/core";
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
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
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
    if (this.currentPodcast.podcast.id === podcast.id) {
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

      this.playStream(this.getAudio(podcast));
    }
  }

  pausePodcast() {
    this.audioService.pause();
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
        case amp.eventName.canplaythrough:
          return this.store.dispatch({
            type: CANPLAY,
            payload: { value: true },
          });

        case amp.eventName.loadedmetadata:
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

        case amp.eventName.playing:
          return this.store.dispatch({
            type: PLAYING,
            payload: { value: true },
          });

        case amp.eventName.pause:
          return this.store.dispatch({
            type: PLAYING,
            payload: { value: false },
          });

        case amp.eventName.timeupdate:
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

        case amp.eventName.loadstart:
          return this.store.dispatch({
            type: LOADSTART,
            payload: { value: true },
          });
      }
    });
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
