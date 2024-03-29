import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as moment from "moment";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  CANPLAYTHROUGH,
  LOADEDMETADATA,
  LOADSTART,
  PLAYING,
  RESET,
  SEEKED,
  START,
  TIMEUPDATE,
  TOGGLE_FULLSCREEN,
} from "src/store";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  private stop$ = new Subject();
  public player: amp.Player = null;
  public podcasts = [];
  public currentPodcast = null;

  public largePlayer = false;

  private state: any = {};

  constructor(private store: Store<any>) {
    this.store.select("appState").subscribe((value: any) => {
      if (value) {
        this.state = value.media;
        this.podcasts = value.podcasts;

        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });
  }

  public initialize = (playerElem) => {
    //Create our audio player with element ref from Ionic **Simple as that :)
    if (this.player) {
      // this.player.playerElement().style.display = "none";
    } else {
      this.player = amp(playerElem, {
        nativeControlsForTouch: false,
        techOrder: [
          "html5",
          "azureHtml5JS",
          "flashSS",
          "html5FairPlayHLS",
          "silverlightSS",
        ],
        autoplay: true,
        controls: true,
        poster: "",
      });

      this.player.ready(() => {
        this.player.playerElement().style.display = "none";

        this.player.addEventListener(amp.eventName.exitfullscreen, () => {
          console.log("Full screen exited, So we hide element again");
          this.hideVideoPlayer();
        });
      });
    }
  };

  showVideoPlayer() {
    this.player.playerElement().style.display = "block";
    if (!this.player.isFullscreen()) {
      this.player.enterFullscreen();
    }
  }

  hideVideoPlayer() {
    this.player.playerElement().style.display = "none";

    if (this.player.isFullscreen()) {
      this.player.exitFullscreen();
    }
  }

  getContentType = (url) => {
    let type = url.split(/[#?]/)[0].split(".").pop().trim();
    if (type == "mp3") {
      return "audio/mp3";
    } else {
      return "video/mp4";
    }
  };

  private streamObservable(url) {
    //Replace native audio events with amd event naming convention (This will map properly to current player)
    let events = [
      "ended",
      "error",
      "play",
      "playing",
      "pause",
      "timeupdate",
      "canplaythrough",
      "loadedmetadata",
      "loadstart",
      "start",
    ];

    const addEvents = function (obj, events, handler) {
      events.forEach((event) => {
        obj.addEventListener(event, handler, { passive: true });
      });
    };

    const removeEvents = function (obj, events, handler) {
      events.forEach((event) => {
        obj.removeEventListener(event, handler);
      });
    };

    //TODO use current Observable methods, this one is deprecated
    return Observable.create((observer) => {
      // Play audio

      let url = this.currentPodcast.contentMedias[
        this.currentPodcast.contentMedias.findIndex((x) => x.title === "mp3")
      ].url;

      let type = this.getContentType(url);

      if (this.player) {
        this.player;
        this.player.src([
          {
            src: url,
            type,
          },
        ]);
      }

      this.player.play();

      // Media Events
      const handler = (event) => observer.next(event);
      addEvents(this.player, events, handler);

      return () => {
        // Stop Playing
        this.player.pause();
        this.player.currentTime(0);

        // Remove EventListeners
        removeEvents(this.player, events, handler);
      };
    });
  }

  playStream(url) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  public rewind() {
    if (this.player.currentTime() > 0) {
      this.player.currentTime(this.player.currentTime() - 30);
    }
  }

  public forward() {
    if (this.player.currentTime() > 0) {
      this.player.currentTime(this.player.currentTime() + 30);
    }
  }

  stop() {
    this.stop$.next();
    this.player.playerElement().style.display = "none";
  }

  seekTo(seconds) {
    this.player.currentTime(seconds);
  }

  formatTime(time, format) {
    return moment.utc(time).format(format);
  }

  playPodcastStream(url) {
    this.stop();
    this.store.dispatch({ type: RESET });
    this.playStream(url).subscribe((event) => {
      //const audioObj = event.target;

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
                time: this.formatTime(
                  this.player.duration() * 1000,
                  "HH:mm:ss"
                ),
                timeSec: this.player.duration(),
                mediaType: "mp3",
              },
            },
          });

        case "seeked":
          return this.store.dispatch({
            type: SEEKED,
            payload: {
              value: true,
              data: {
                time: this.formatTime(
                  this.player.duration() * 1000,
                  "HH:mm:ss"
                ),
                timeSec: this.player.duration(),
                mediaType: "mp3",
              },
            },
          });

        case "fullscreenchange":
          return this.store.dispatch({
            type: TOGGLE_FULLSCREEN,
            payload: { value: !this.player.isFullscreen() },
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
              timeSec: this.player.currentTime(),
              time: this.formatTime(
                this.player.currentTime() * 1000,
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
