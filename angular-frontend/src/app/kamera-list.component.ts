import { Component, Input, OnInit } from '@angular/core';
import { KameraService } from './kamera.service';
import { Kamera } from './kamera';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Headers, Http , RequestOptions } from '@angular/http';

@Component({
  selector: 'kamera-list',
  templateUrl: './kamera-list.component.html'
})

export class KameraListComponent implements OnInit {
  kamerat: Kamera[];
  newKamera: Kamera = new Kamera();
  editing: boolean = false;
  editingKamera: Kamera = new Kamera();
 
  

  constructor(
    private kameraService: KameraService,
  ) {}

  private http: Http
  private baseUrl = 'http://localhost:8080';
  ngOnInit(): void {
    this.getKamerat();
  }

  getKamerat(): void {
    this.kameraService.getKamerat()
      .then(kamerat => this.kamerat = kamerat );    
  }

  createKamera(kameraForm: NgForm): void {
    this.kameraService.createKamera(this.newKamera)
      .then(createKamera => {        
        kameraForm.reset();
        this.newKamera = new Kamera();
        this.kamerat.unshift(createKamera)
      });
  }

  deleteKamera(id: string): void {
    this.kameraService.deleteKamera(id)
    .then(() => {
      this.kamerat = this.kamerat.filter(kamera => kamera.id != id);
    });
  }

  //  updateKamera(kameraData: Kamera): void {
  //    console.log(kameraData);
  //    this.kameraService.updateKamera(kameraData)
  //    .then(updatedKamera => {
  //      let existingKamera = this.kamerat.find(kamera => kamera.id === updatedKamera.id);
  //      Object.assign(existingKamera, updatedKamera);
  //      this.clearEditing();
  //   });
  //  }
    fillKamera(kamera:Kamera):void{
    console.log(kamera);
     this.kameraService.fillKamera(kamera);

    }

    updateKamera(id: String, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl + '/api/kamerat'}/${id}`, value);
    }
//   updateKamera(){
//     let kamera:Kamera = {
//       id: this.id,
//       emri: this.emri,
//       modeli: this.modeli,
//       rezolucioni: this.rezolucioni,
//       ip: this.ip
//     };
//     this.kameraService.updateKamera(kamera, this.id)
//     .subscribe(
//       success => alert("Done"),
//       error => alert(error)
//     );
// }


  editKamera(kameraData: Kamera): void {
    this.editing = true;
    Object.assign(this.editingKamera, kameraData);
  }

  clearEditing(): void {
    this.editingKamera = new Kamera();
    this.editing = false;
  }
}