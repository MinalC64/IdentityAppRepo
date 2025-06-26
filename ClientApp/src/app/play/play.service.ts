import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http:HttpClient) { 

  }

  getPlayers(){
    const appUrl = 'https://localhost:44356/api/play/get-players';
    return this.http.get(appUrl);
  }
}
