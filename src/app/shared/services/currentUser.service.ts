import { Injectable } from '@angular/core';
import { User } from '../model/user.model';


@Injectable()
export class CurrentUserService { 
  // Get User Object from local storage
  getUser(): any {
    const user = localStorage.getItem('jwtToken');  
    console.log(user);
    return user;
  }
  // Save User Object in local storage
  saveUser(jwtToken: any) {
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
  }
  // Remove User Object in local storage
  destroyUser() {
    localStorage.removeItem('jwtToken');
  }
}
