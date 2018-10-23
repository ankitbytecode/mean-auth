import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http } from '@angular/http';
import { CurrentUserService } from './../shared/services/currentUser.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  message;
  token;

  constructor(
    private router: Router,
    private http: Http,
    private cUser: CurrentUserService,
  ) { }

  check()
  { this.token = this.cUser.getUser();
    console.log(this.token);
    this.http.post("http://localhost:3030/api/getData",{"token": this.token, "email":"a9kit.k@gmail.com"})
    .subscribe(res=>
    {
      this.message = res;
      console.log(this.message);
    })
  }

  ngOnInit() {
  }

}
