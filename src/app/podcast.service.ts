import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PodcastService {
  baseUrl = "http://138.68.106.220:3000/api";
  public token;
  constructor(private http: HttpClient) {}

  public getPodcasts() {
    var data = JSON.stringify({ notreSelection: true });

    return this.http.post(`${this.baseUrl}/getPodcasts`, data);
  }

  public getApiToken = () => {
    return this.http
      .get(this.baseUrl + "/getToken", {
        responseType: "text",
      })
      .subscribe((result) => {
        localStorage.setItem("token", result);
      });
  };
}
