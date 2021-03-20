import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible:boolean = true;

  constructor(public spinner : NgxSpinnerService) { 
    this.visible = false; 
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  getValue(){
    return this.visible
  }

}
