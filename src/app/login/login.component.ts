import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Errors } from '../shared/model/errors.model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import {
  AuthService,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular5-social-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: Errors = new Errors();
  message="";
  email;
  name;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private socialAuthService: AuthService,) { 
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  submitForm()
  { 
    this.errors = new Errors();
    const data = this.loginForm.value;
    
    this.userService
      .attemptLogin(data)
      .subscribe(
        res=>{
        this.router.navigate(['/dash']);
        
      },
      err=>
      {
        this.message="Invalid attempt";
      }
    
    )
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "linkedin"){
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
           
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      
      (userData) => {      
        
       console.log(socialPlatform+" sign in data : " , userData);
       this.userService
      .socialLogin(userData)
      .subscribe(
        res=>{
        this.router.navigate(['/dash']);
        
      },
      err=>
      {
        this.message=err.errors;
      }
    
    )
        
      
      }
    );
    
  }

  ngOnInit() {
  }

}
