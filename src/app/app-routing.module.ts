import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from './shared/services/auth-guard.service';

const appRoutes: Routes = [ 
{path:'login', component:LoginComponent, pathMatch: 'full'},
{path:'', component:RegisterComponent, pathMatch: 'full'},
{ path: 'dash', component: DashComponent, pathMatch: 'full', canActivate: [AuthGuard] },  


];

@NgModule({
    imports: [
      
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }