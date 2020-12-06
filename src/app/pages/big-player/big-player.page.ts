import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IonRange } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-big-player",
  templateUrl: "./big-player.page.html",
  styleUrls: ["./big-player.page.scss"],
})
export class BigPlayerPage {
  public currentPodcast: any;

  player: amp.Player = this.audioService.player;

  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;

  @ViewChild("range", { static: false }) range: IonRange;
  progress: number;

  constructor(private store: Store<any>, private audioService: AudioService) {}

  ionViewWillEnter(): void {
    this.store.select("appState").subscribe((value) => {
      if (value) {
        this.state = value.media;
        // this.progress =
        //   (this.state.durationSec / this.player.duration()) * 100 || 0;

        this.progress = (this.state.timeSec / this.state.durationSec) * 100;

        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });

    this.audioService.hideVideoPlayer();
  }

  getThumbnail() {
    return this.currentPodcast.contentMedias[
      this.currentPodcast.contentMedias.findIndex(
        (x) => x.title === "thumbnail"
      )
    ].url;
  }

  seek() {
    let newValue = +this.range.value / 100;
    let duration = this.player.duration();
    this.audioService.seekTo(duration * newValue);
  }

  updateProgress() {
    this.progress =
      (this.state.durationSec / this.player.duration()) * 100 || 0;

    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  rewind() {
    this.audioService.rewind();
  }

  forward() {
    this.audioService.forward();
  }

  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
  }
}
