import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { KameraListComponent } from './kamera-list.component';
import { KameraService } from './kamera.service';







@NgModule({
  declarations: [
    AppComponent,
    KameraListComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   
  ],
  providers: [KameraService],
  bootstrap: [AppComponent],

})
export class AppModule { }