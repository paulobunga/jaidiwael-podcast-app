import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PodcastService {
  baseUrl = "https://cors-anywhere.herokuapp.com/http://138.68.106.220:3000/";

  constructor(private http: HttpClient) {}

  public getPodcasts() {
    return this.http.get(this.baseUrl);
  }
}
