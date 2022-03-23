import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {path: "about", component: AboutComponent},
  {path: "product/:id", component: ProductPageComponent},
  {path: "**", component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
