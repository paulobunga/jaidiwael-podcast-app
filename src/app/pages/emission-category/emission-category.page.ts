import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AudioService } from "src/app/services/audio.service";
import { RadioService } from "src/app/services/radio.service";
import {
  CANPLAYTHROUGH,
  GET_PODCASTS,
  LOADEDMETADATA,
  LOADSTART,
  PLAYING,
  RESET,
  SET_CURRENT_TRACK,
  START,
  TIMEUPDATE,
} from "src/store";

@Component({
  selector: "app-emission-category",
  templateUrl: "./emission-category.page.html",
  styleUrls: ["./emission-category.page.scss"],
})
export class EmissionCategoryPage implements OnInit {
  bgEmissionCategoriesUrl: string;

  podcasts: any[] = [];
  currentPodcast: any;
  state: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private audioService: AudioService,
    private radioService: RadioService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.audioService.hideVideoPlayer();

    this.getEmissionCategories(
      this.activatedRoute.snapshot.params["emissionId"]
    );
    this.getEmissionsCategory(
      this.activatedRoute.snapshot.params["emissionId"]
    );

    this.store.select("appState").subscribe((value) => {
      if (value) {
        this.state = value.media;
        this.podcasts = value.podcasts;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });
  }

  getEmissionCategories(emissionId: number) {
    const emissionCategories = this.radioService.getEmissionCategories();
    this.bgEmissionCategoriesUrl = emissionCategories.find(
      (x: any) => x.emissionId == emissionId
    ).imgBanner;
    console.log("this.bgEmissionCategoriesUrl", this.bgEmissionCategoriesUrl);
  }

  getEmissionsCategory(emissionId: number) {
    const filterBy = {
      notreSelection: false,
      alaUne: false,
      idEmission: emissionId,
    };

    Object.freeze(filterBy);

    console.log("emissionId", emissionId);
    this.radioService.getPodcasts(filterBy).subscribe(
      (res: any) => {
        this.store.dispatch({ type: GET_PODCASTS, payload: { value: res } });
      },
      (error: any) => {
        if (error.status == 401) {
          this.radioService.getToken().subscribe((_) => {
            this.getEmissionsCategory(emissionId);
          });
        }
      }
    );
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
    if (this.currentPodcast && this.currentPodcast.id === podcast.id) {
      if (this.state.playing) {
        this.audioService.pause();
      } else {
        this.audioService.play();
      }
    } else {
      this.store.dispatch({
        type: SET_CURRENT_TRACK,
        payload: { value: podcast },
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

  playStream(url) {
    this.resetState();
    this.audioService.playStream(url).subscribe((event) => {
      const audioObj = event.target;

      switch (event.type) {
        case "canplaythrough":
          return this.store.dispatch({
            type: CANPLAYTHROUGH,
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

        case "start":
          return this.store.dispatch({
            type: START,
            payload: { value: true },
          });
      }
    });
  }
}
