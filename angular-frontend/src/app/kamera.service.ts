import { Injectable } from '@angular/core';
import { Kamera } from './kamera';
import { Headers, Http , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { KameraListComponent } from './kamera-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class KameraService {
  private baseUrl = 'http://localhost:8080';
  private kamera ;

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

  //  updateKamera(kameraData: Kamera): Promise<Kamera> {
  //   console.log(kameraData);
   
  //   return this.http.put(`${'http://localhost:8080/api/kamerat'}/${this.kamera.id}`, kameraData)
  //    .toPromise()
  //   .then(response => response.json() as Kamera)
  //     .catch(this.handleError);

  //  }

  // updateKamera(kameraData: Kamera, id: String){
  //   return this.http.put(`${'http://localhost:8080/api/kamerat'}/${id}`, kameraData);
  // }

  updateKamera(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl + '/api/kamerat'}/${id}`, value);
  }
  deleteKamera(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/kamerat/' + id)
      .toPromise()
      .catch(this.handleError);
  }


  fillKamera(kamera: Kamera){
     this.kamera = kamera;

  }
  // getKameraId(id:string) {
  //   return  id;

  // }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}

