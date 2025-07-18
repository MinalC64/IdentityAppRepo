import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          const token  = user.jwt;
          //clone from the coming request and add Authorization header to that
          request = request.clone({
            setHeaders:{
              Authorization: 'Bearer '+ token            
            }
          })
        }
      }
    });

    return next.handle(request);
  }
}
