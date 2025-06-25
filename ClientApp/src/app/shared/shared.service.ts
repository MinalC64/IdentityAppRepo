import { Injectable } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from './components/models/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  bsModalRef?:BsModalRef;

  constructor(private modalService:BsModalService) { }

  showNotification(isSuccess:boolean,title:string,message:string){
    const intialState:ModalOptions = {
      initialState:{
        isSuccess,
        title,
        message
      }
    };
    this.bsModalRef = this.modalService.show(NotificationComponent,intialState);
  }
}
