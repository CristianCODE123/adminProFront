import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor() { }

  @Output() valueEmitter = new EventEmitter<string>();
  @Output() closeRow = new EventEmitter<string>();


}
