import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Stream } from '@apirtc/apirtc';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  nativeElement(nativeElement: any) {
    throw new Error('Method not implemented.');
  }

  @Output() stream = new EventEmitter<string>();



  @Output() valueEmitter = new EventEmitter<string>();
  getResponseFromNode(){
    this.http.get('/api/start').subscribe((data) =>{
      console.log("dataNodE?",data)
    })
  }
  constructor(private http: HttpClient) { }
}
