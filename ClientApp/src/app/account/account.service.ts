import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/models/register';
import { environment } from 'src/environments/environment.development';
import { Login } from '../shared/models/Login';
import { User } from '../shared/models/user';
import { map, of, ReplaySubject } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();  

  constructor(private http:HttpClient,
              private router:Router) {

               } 
  
  refreshUser(jwt:string | null){
    if(jwt === null){
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization','Bearer ' + jwt);

    const appUrl = 'https://localhost:44356/api/account/refresh-user-token'
    return this.http.get<User>(appUrl,{headers}).pipe(
      map((user:User) => {
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  login(model:Login)
  {
     const url = 'https://localhost:44356/api/account/login'
     return this.http.post<User>(url,model).pipe(
      map((user:User) => {
        if(user){
          this.setUser(user);          
        }        
      })
     );
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }

  register(model:Register){
   // const url ='${environment.appUrl}/api/account/register';
    const url = 'https://localhost:44356/api/account/register'
     return this.http.post(url,model);
  }

  getJWT(){
    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user:User = JSON.parse(key);
      return user.jwt;
    }
    else{
      return null;
    }
  }

  private setUser(user:User){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.userSource.next(user);    
  }
}
