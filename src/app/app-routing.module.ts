import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { GetOneUserComponent } from './get-one-user/get-one-user.component';
import { AddCantactComponent } from './add-cantact/add-cantact.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'add-contact', component: AddCantactComponent },
  { path: 'add-contact/:id', component: AddCantactComponent },
  { path: 'get-one-user', component: GetOneUserComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
