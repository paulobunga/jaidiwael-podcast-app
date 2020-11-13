import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IonContent, LoadingController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, filter, map, pluck } from "rxjs/operators";
import { RESET } from "src/store";
import { SHOW_PLAYER } from "./../../store/index";
import { AudioService } from "./../audio.service";
import { PodcastService } from "./../podcast.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],

  animations: [
    trigger("showHide", [
      state(
        "active",
        style({
          opacity: 1,
        })
      ),
      state(
        "inactive",
        style({
          opacity: 0,
        })
      ),
      transition("inactive => active", animate("250ms ease-in")),
      transition("active => inactive", animate("250ms ease-out")),
    ]),
  ],
})
export class PlayerComponent implements AfterViewInit {
  public currentPodcast: any = {};
  public podcasts: any[];

  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;
  displayFooter: string = "inactive";
  @ViewChild(IonContent) content: IonContent;

  constructor(
    public audioService: AudioService,
    public podcastService: PodcastService,
    private store: Store<any>,
    public loadingCtrl: LoadingController
  ) {}

  ngAfterViewInit(): void {
    this.store.select("appState").subscribe((value: any) => {
      if (value) {
        this.state = value.media;
        this.displayFooter = value.showPlayer ? "active" : "inactive";
        this.podcasts = value.podcasts;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
    });

    this.store
      .select("appState")
      .pipe(
        pluck("media", "canplay"),
        filter((value) => value === true)
      )
      .subscribe(() => {
        this.displayFooter = "active";
      });

    this.store
      .select("appState")
      .pipe(
        pluck("media", "timeSec"),
        filter((value) => value !== undefined),
        map((value: any) => Number.parseInt(value)),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.seekbar.setValue(value);
      });

    this.store
      .select("appState")
      .pipe(
        pluck("media", "timeSec"),
        filter((value) => value !== undefined),
        map((value: any) => Number.parseInt(value)),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.seekbar.setValue(value);
      });
  }

  resetState() {
    this.audioService.stop();
    this.store.dispatch({ type: RESET });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  close() {
    this.resetState();
  }

  next() {
    let index = this.currentPodcast.index + 1;
    let podcast = this.podcasts[index];
    //this.openPodcast(podcast, index);
  }

  previous() {
    let index = this.currentPodcast.index - 1;
    let podcast = this.podcasts[index];
    //this.openPodcast(podcast, index);
  }

  isFirstPlaying() {
    return this.currentPodcast.index === 0;
  }

  isLastPlaying() {
    return this.currentPodcast.index === this.podcasts.length - 1;
  }

  onSeekStart() {
    this.onSeekState = this.state.playing;
    if (this.onSeekState) {
      this.pause();
    }
  }

  onSeekEnd(event) {
    if (this.onSeekState) {
      this.audioService.seekTo(event.value);
      this.play();
    } else {
      this.audioService.seekTo(event.value);
    }
  }
}
