import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './crud/create/create.component';
import { DetailsComponent } from './crud/details/details.component';
import { HomeComponent } from './crud/home/home.component';
import { UpdateComponent } from './crud/update/update.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  
  { path: 'crud/home', component: HomeComponent },
  { path: 'crud/view/:productId', component: DetailsComponent },
  { path: 'crud/create', component: CreateComponent },
  { path: 'crud/update/:productId', component: UpdateComponent },
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : '', component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
