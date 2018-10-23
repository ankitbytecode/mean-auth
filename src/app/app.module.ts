import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
  

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService} from './shared/services/api.service';
import { JwtService} from './shared/services/jwt.service';
import { UserService} from './shared/services/user.service';
import { CurrentUserService,} from './shared/services/currentUser.service';
import { AuthGuard,} from './shared/services/auth-guard.service';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from './register/register.component';
import { DashComponent } from './dash/dash.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  
} from "angular5-social-auth";
import { PingComponent } from './ping/ping.component';
  
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("452256718514075")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("312449017385-f2troevdn1j75u9iuiueqi1fhrcufmoa.apps.googleusercontent.com")
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider("863e3r7vwpk3zb")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashComponent,
    PingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    SocialLoginModule,
  ],
  providers: [
    ApiService,
    JwtService,
    UserService,
    CurrentUserService,
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
      
    }
    

  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
