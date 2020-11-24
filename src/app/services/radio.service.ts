import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/Operators';
const { API_URL } = environment;

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  constructor(private http: HttpClient) {



  }

  getToken() {
    return this.http.get(`${API_URL}api/getToken`)
      .pipe(
        tap((result: any) => {
          localStorage.setItem('access_token', result);
        })
      );
  }


  getPodcasts(filterBy: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'target': 'internal',
    });

    const options = { headers: headers };

    return this.http.post(`${API_URL}api/getPodcasts`, filterBy, options);
  }


  getEmissionCategories() {
    return [
      {
        imgUrl: '../../assets/imgs/lesMatinalesKPMGldpi.png',
        imgBanner: '../../assets/imgs/bgMatinalesKPMG.png',
        contentId: 0,
        emissionId: 1
      },
      {
        imgUrl: '../../assets/imgs/eureka.png',
        imgBanner: '../../assets/imgs/bgEureka.png',
        contentId: 0,
        emissionId: 2
      },
      {
        imgUrl: '../../assets/imgs/lesFiscalesKPMG.png',
        imgBanner: '../../assets/imgs/bgFiscalesDeKPMG.png',
        contentId: 0,
        emissionId: 70
      },
      {
        imgUrl: '../../assets/imgs/Frequence_Banque.png',
        imgBanner: '../../assets/imgs/bgFrequenceBanque.png',
        contentId: 0,
        emissionId: 3
      },
      {
        imgUrl: '../../assets/imgs/les_webcasts.png',
        imgBanner: '../../assets/imgs/bgWebcastsKPMG.png',
        contentId: 0,
        emissionId: 4
      },
      {
        imgUrl: '../../assets/imgs/classe_assurance.png',
        imgBanner: '../../assets/imgs/bgClasseAssurance.png',
        contentId: 0,
        emissionId: 5
      },
      {
        imgUrl: '../../assets/imgs/les_Directs.png',
        imgBanner: '../../../assets/imgs/bg_Directs_KPMG.png',
        contentId: 0,
        emissionId: 64
      }
    ]
  }


}
