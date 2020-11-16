import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IonContent, LoadingController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, filter, map, pluck } from "rxjs/operators";
import { RESET } from "src/store";
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
  @ViewChild("audio", { read: ElementRef }) audioPlayer: ElementRef;
  public currentPodcast: any = {};
  public podcasts: any[];

  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;
  displayFooter: string = "inactive";
  @ViewChild(IonContent) content: IonContent;

  player: amp.Player;

  constructor(
    public audioService: AudioService,
    public podcastService: PodcastService,
    private store: Store<any>,
    public loadingCtrl: LoadingController
  ) {}

  ngAfterViewInit(): void {
    let playerElem = this.audioPlayer.nativeElement;

    this.audioService.initialize(playerElem);

    this.store.select("appState").subscribe((value: any) => {
      if (value) {
        this.state = value.media;
        //this.displayFooter = value.showPlayer ? "active" : "inactive";
        console.log(this.state);
        this.podcasts = value.podcasts;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
          this.displayFooter = "active";
        }
      }
    });

    this.store
      .select("appState")
      .pipe(
        pluck("media", "canplaythrough"),
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
    this.displayFooter = "active";
  }

  stop() {
    this.audioService.stop();
  }

  close() {
    this.resetState();
    this.displayFooter = "inactive";
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
