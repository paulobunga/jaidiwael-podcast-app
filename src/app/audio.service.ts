import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  private stop$ = new Subject();
  private player: amp.Player = null;

  constructor() {}

  public initialize = (playerElem) => {

    //Create our audio player with element ref from Ionic **Simple as that :)
    this.player = amp(playerElem, {
      techOrder: [
        "azureHtml5JS",
        "flashSS",
        "html5FairPlayHLS",
        "silverlightSS",
        "html5",
      ],
      autoplay: true,
      controls: true,
      poster: "",
    });
  };

  private streamObservable(url) {
    //Replace native audio events with amd event naming convention (This will map properly to current player)
    let events: any = [
      amp.eventName.ended,
      amp.eventName.error,
      amp.eventName.play,
      amp.eventName.playing,
      amp.eventName.pause,
      amp.eventName.timeupdate,
      amp.eventName.canplaythrough,
      amp.eventName.loadedmetadata,
      amp.eventName.loadstart,
    ];

    const addEvents = function (obj, events, handler) {
      events.forEach((event) => {
        obj.addEventListener(event, handler);
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

      this.player && this.player.src([
        {
          src: url,
          type: "audio/mp3",
        },
      ]);
      //this.player.load();
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

  stop() {
    this.stop$.next();
  }

  seekTo(seconds) {
    this.player.currentTime(seconds);
  }

  formatTime(time, format) {
    return moment.utc(time).format(format);
  }
}
