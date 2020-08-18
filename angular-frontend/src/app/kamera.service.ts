import { Injectable } from '@angular/core';
import { Kamera } from './kamera';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class KameraService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getKamerat():  Promise<Kamera[]> {
    return this.http.get(this.baseUrl + '/api/kamerat/')
      .toPromise()
      .then(response => response.json() as Kamera[])
      .catch(this.handleError);
  }

  createKamera(kameraData: Kamera): Promise<Kamera> {
    return this.http.post(this.baseUrl + '/api/kamerat/', kameraData)
      .toPromise().then(response => response.json() as Kamera)
      .catch(this.handleError);
  }

  updateKamera(kameraData: Kamera): Promise<Kamera> {
    return this.http.put(this.baseUrl + '/api/kamerat/' + kameraData.id, kameraData)
      .toPromise()
      .then(response => response.json() as Kamera)
      .catch(this.handleError);
  }

  deleteKamera(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/kamerat/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}