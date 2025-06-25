import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/models/register';
import { environment } from 'src/environments/environment.development';
import { Login } from '../shared/models/Login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  

  constructor(private http:HttpClient) { }   

  login(model:Login)
  {
     const url = 'https://localhost:44356/api/account/login'
     return this.http.post(url,model);
  }

  register(model:Register){
   // const url ='${environment.appUrl}/api/account/register';
    const url = 'https://localhost:44356/api/account/register'
     return this.http.post(url,model);
  }
}
