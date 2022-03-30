import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PhotosComponent } from './photos/photos.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "photos", component: PhotosComponent},
  {path: "login", component: LoginComponent},
  {path: "product/:id", component: ProductPageComponent},
  {path: "**", component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
