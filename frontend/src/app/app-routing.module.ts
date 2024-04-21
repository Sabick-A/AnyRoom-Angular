import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { ShowListingComponent } from './show-listing/show-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { NewListingComponent } from './new-listing/new-listing.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:"",
    component: ListingsComponent,
  },
  {
    path:"listings",
    component: ListingsComponent,
  },
  {
    path:"listings/new",
    component: NewListingComponent,
  
  },
  {
    path:"listings/:id",
    component: ShowListingComponent,
  },
  {
    path:"listings/:id/edit",
    component: EditListingComponent,
  },
  {
    path:"signup",
    component:SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
