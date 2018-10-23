import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Errors } from '../shared/model/errors.model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: Errors = new Errors();

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { 
      this.registerForm = this.fb.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', Validators.required],
        'state': ['', Validators.required],
        'city': ['', Validators.required]
      });
    }

    submitForm()
  { 
    this.errors = new Errors();
    const data = this.registerForm.value;
    console.log(data);
    this.userService
      .attemptRegister(data)
      .subscribe(res=>{
        if(res)
        {
          this.router.navigate(['login']);
        }
        console.log(res);
      })
  }

  ngOnInit() {
  }

}
