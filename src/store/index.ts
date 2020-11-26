import { Action } from "@ngrx/store";

export interface MediaAction extends Action {
  type: string;
  payload?: any;
}

export const CANPLAYTHROUGH = "CANPLAYTHROUGH";
export const LOADEDMETADATA = "LOADEDMETADATA";
export const PLAYING = "PLAYING";
export const TIMEUPDATE = "TIMEUPDATE";
export const LOADSTART = "LOADSTART";
export const RESET = "RESET";

export const GET_PODCASTS = "GET_PODCASTS";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const GET_CURRENT_TRACK = "GET_CURRENT_TRACK";

export const SHOW_PLAYER = "SHOW_PLAYER";

export const START = "START";

export const SHOW_VIDEO = "SHOW_VIDEO";

export const TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN";

const INITIALSTATE = {
  media: {},
  podcasts: [],
  currentPodcast: {},
  showVideo: false,
};

export function mediaStateReducer(
  state: any = INITIALSTATE,
  action: MediaAction
) {
  let payload = action.payload;
  switch (action.type) {
    case SHOW_VIDEO:
      return {
        ...state,
        showVideo: payload.value,
      };
    case SHOW_PLAYER:
      return {
        ...state,
        showPlayer: true,
      };

    case GET_PODCASTS:
      return {
        ...state,
        podcasts: payload.value,
      };

    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentPodcast: payload.value,
      };

    case GET_CURRENT_TRACK:
      return {
        ...state,
        currentPodcast: payload.value,
      };

    case CANPLAYTHROUGH:
      return {
        ...state,
        media: {
          ...state.media,
          canplaythrough: payload.value,
        },
      };
    case LOADEDMETADATA:
      return {
        ...state,
        media: {
          ...state.media,
          loadedmetadata: payload.value,
          duration: payload.data.time,
          durationSec: payload.data.timeSec,
          mediaType: payload.data.mediaType,
        },
      };
    case PLAYING:
      return {
        ...state,
        media: {
          ...state.media,
          playing: payload.value,
        },
      };

    case START:
      return {
        ...state,
        media: {
          ...state.media,
          playing: true,
        },
      };

    case TOGGLE_FULLSCREEN:
      return {
        ...state,
        media: {
          ...state.media,
          showFullscreen: payload.value,
        },
      };

    case TIMEUPDATE:
      return {
        ...state,
        media: {
          ...state.media,
          time: payload.time,
          timeSec: payload.timeSec,
        },
      };
    case LOADSTART:
      return {
        ...state,
        media: {
          ...state.media,
          loadstart: payload.value,
        },
      };
    case RESET:
      state = Object.assign({}, state);
      (state.currentPodcast = null), (state.media = {});
      return state;
    default:
      state = {};
      state.media = {};
      return state;
  }
}
