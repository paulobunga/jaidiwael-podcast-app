import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { RESET, SET_CURRENT_TRACK } from "src/store";
import { AudioService } from "../services/audio.service";
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

  getColor(podcast) {
    if (podcast) {
      let color = podcast.emission.codeCouleur;
      switch (color) {
        case "#8a8a8a":
          return "play-gray";
        case "#5573da":
          return "play-indigo";
        case "#6a4a97":
          return "play-pupple";
        case "#ec4347":
          return "play-red";
        case "#1f00be":
          return "play-blue";
      }
    } else {
      return "play-blue";
    }
  }

  openPodcast(podcast) {
    if (this.currentPodcast.id === podcast.id) {
      if (this.state.playing) {
        this.audioService.pause();
      } else {
        this.audioService.play();
      }
    } else {
      let currentPodcast = { ...podcast };
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
}
