import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { CurrentUserService } from './currentUser.service';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private currentUserService: CurrentUserService,
  ) { }

  setAuth(user: User) {
    // Save Current User sent from server in local storage
    this.currentUserService.saveUser(user);
    // Save JWT sent from server in local storage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }


  attemptLogin(data): any {
   // console.log('attemptlogin called in user service');
   
    return this.apiService.post('/login', data)
      .map(
        res => {
          
          this.setAuth(res);
          return res;
        }
      );
  }

  socialLogin(data): any {
    
    return this.apiService.post('/socialLogin', data)
      .map(
        res => {          
          this.setAuth(res);
          return res;
        }
      );
  }

  attemptRegister(data): any{
    return this.apiService.post('/register', data)
      .map(
        res => {
          this.setAuth(res);
          return res;
        }
      );
  }

}
