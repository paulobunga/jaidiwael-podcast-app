import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-podcast-player",
  templateUrl: "./podcast-player.page.html",
  styleUrls: ["./podcast-player.page.scss"],
})
export class PodcastPlayerPage {
  public currentPodcast: any = null;

  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;
  player: amp.Player;

  constructor(private store: Store<any>, private audioService: AudioService) {}

  ionViewWillEnter(): void {
    this.store.select("appState").subscribe((value) => {
      if (value) {
        console.log(value);
        this.state = value.media;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });
  }

  getThumbnail() {
    return this.currentPodcast.contentMedias[
      this.currentPodcast.contentMedias.findIndex(
        (x) => x.title === "thumbnail"
      )
    ].url;
  }

  onSeekStart() {
    this.onSeekState = this.state.playing;
    if (this.onSeekState) {
      this.audioService.pause();
    }
  }

  onSeekEnd(event) {
    if (this.onSeekState) {
      this.audioService.seekTo(event.value);
      this.audioService.play();
    } else {
      this.audioService.seekTo(event.value);
    }
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
  }
}
