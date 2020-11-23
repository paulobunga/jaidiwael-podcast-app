import { Component, OnInit } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';
import { AudioService } from 'src/app/services/audio.service';
import { Store } from "@ngrx/store";
import { GET_PODCASTS, RESET, SET_CURRENT_TRACK } from "src/store";
@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.page.html',
  styleUrls: ['./podcasts.page.scss'],
})

export class PodcastsPage implements OnInit {

  podcasts: any[] = [];
  currentPodcast: any = {};
  state: any = {};

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    pager: true,
  };

  headlinesPodcasts: any[] = [];
  ourSelectionPodcasts: any[] = [];
  emissionCategories: any[] = [];


  constructor(
    private audioService: AudioService,
    private radioService: RadioService,
    private store: Store<any>) {

  }

  ngOnInit() {

    this.store.select("appState").subscribe((value) => {
      if (value) {
        this.state = value.media;
        this.podcasts = value.podcasts;
        if (value.currentPodcast) {
          this.currentPodcast = value.currentPodcast;
        }
      }
      console.log("PodcastsPage#value", value);
    });

    this.getOurSelectionPodcast();
    this.getHeadlinesPodcasts();
    this.getEmissionCategories();

  }

  getHeadlinesPodcasts() {
    const filterBy = { alaUne: true }
    this.radioService.getPodcasts(filterBy)
      .subscribe((res: any) => {
        console.log('getHeadlinesPodcasts#res', res);
        this.headlinesPodcasts = res.reverse();


      }, (error: any) => {
        console.log('getHeadlinesPodcasts#error', error);
        if (error.status == 401) {
          this.radioService.getToken()
            .subscribe(_ => {
              this.getHeadlinesPodcasts();
            });
        }
      });

  }

  getEmissionCategories() {
    this.emissionCategories = this.radioService.getEmissionCategories();
  }

  getOurSelectionPodcast() {
    const filterBy = {
      notreSelection: true,
      alaUne: false,
      idEmission: 0,
      type: null
    }
    this.radioService.getPodcasts(filterBy).subscribe((res: any) => {
      console.log('getOurSelectionPodcast#res', res);
      this.ourSelectionPodcasts = res;
      this.store.dispatch({
        type: GET_PODCASTS,
        payload: { value: res.reverse() },
      });

    }, (error: any) => {
      console.log('getOurSelectionPodcast#error', error);
      if (error.status == 401) {
        this.radioService.getToken()
          .subscribe(_ => {
            this.getOurSelectionPodcast();
          });
      }
    });
  }

  getAudio(podcast) {
    return podcast.contentMedias[
      podcast.contentMedias.findIndex((x) => x.title === "mp3")
    ].url;
  }

  getColor(podcast) {
    let color = podcast.podcast.emission.codeCouleur;
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

  openPodcast(podcast, index) {
    console.log('podcast', podcast);
    if (this.currentPodcast.podcast === podcast) {
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
