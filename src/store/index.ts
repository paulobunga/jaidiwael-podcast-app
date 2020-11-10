import { Action } from "@ngrx/store";

export interface MediaAction extends Action {
  type: string;
  payload?: any;
}

export const CANPLAY = "CANPLAY";
export const LOADEDMETADATA = "LOADEDMETADATA";
export const PLAYING = "PLAYING";
export const TIMEUPDATE = "TIMEUPDATE";
export const LOADSTART = "LOADSTART";
export const RESET = "RESET";

export const GET_PODCASTS = "GET_PODCASTS";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const GET_CURRENT_TRACK = "GET_CURRENT_TRACK";

export function mediaStateReducer(state, action: MediaAction) {
  let payload = action.payload;
  switch (action.type) {
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

    case CANPLAY:
      return {
        ...state,
        media: {
          ...state.media,
          canplay: payload.value,
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
      return {
        ...state,
        media: {},
      };
    default:
      return state;
  }
}
