import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { IonContent, LoadingController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, filter, map, pluck } from "rxjs/Operators";
import { AudioService } from "src/app/services/audio.service";
import { RESET } from "src/store";

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
export class PlayerComponent implements AfterViewInit, OnChanges {
  @ViewChild("audio", { read: ElementRef }) audioPlayer: ElementRef;
  public currentPodcast: any = {};
  public podcasts: any[];
  public showVideo: boolean = false;

  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;
  displayFooter: string = "inactive";
  @ViewChild(IonContent) content: IonContent;

  @Input() isLarge: boolean;

  player: amp.Player;

  constructor(
    public audioService: AudioService,
    private store: Store<any>,
    public loadingCtrl: LoadingController,
    public router: Router
  ) {}

  ngAfterViewInit(): void {
    let playerElem = this.audioPlayer.nativeElement;

    this.audioService.initialize(playerElem);

    this.store.select("appState").subscribe((value: any) => {
      if (value) {
        this.state = value.media;
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

  getColor() {
    if (this.currentPodcast) {
      let color = this.currentPodcast.podcast.emission.codeCouleur;
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
    }
  }

  navigate() {
    let url = this.currentPodcast.podcast.contentMedias[
      this.currentPodcast.podcast.contentMedias.findIndex(
        (x) => x.title === "mp3"
      )
    ].url;
    let type = url.split(/[#?]/)[0].split(".").pop().trim();
    if (type == "mp3") {
      this.router.navigate([`/big-player`]);
    } else {
      console.log("this is video");
      this.audioService.showVideoPlayer();
    }
  }

  ngOnChanges(changes: SimpleChanges) {}

  canShowPlayer() {
    if (this.showVideo) {
      return "show-player";
    } else {
      return "hide-player";
    }
  }
}
