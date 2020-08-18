import { Component, Input, OnInit } from '@angular/core';
import { KameraService } from './kamera.service';
import { Kamera } from './kamera';
import {NgForm} from '@angular/forms';

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

  updateKamera(kameraData: Kamera): void {
    console.log(kameraData);
    this.kameraService.updateKamera(kameraData)
    .then(updatedKamera => {
      let existingKamera = this.kamerat.find(kamera => kamera.id === updatedKamera.id);
      Object.assign(existingKamera, updatedKamera);
      this.clearEditing();
    });
  }

  
  editKamera(kameraData: Kamera): void {
    this.editing = true;
    Object.assign(this.editingKamera, kameraData);
  }

  clearEditing(): void {
    this.editingKamera = new Kamera();
    this.editing = false;
  }
}