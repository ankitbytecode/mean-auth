import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { CurrentUserService } from './currentUser.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _currentUser: CurrentUserService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {  
    const url = state.url;
    const params = <any>route.queryParams;
    
    const x = this._currentUser.getUser();
    console.log(x);
    if (x == null || x == 'undefined' ) {
      this.router.navigate(['']);
      return new BehaviorSubject<boolean>(false);
    } else {
      console.log('right user');
      return new BehaviorSubject<boolean>(true);
    }
  }
}
