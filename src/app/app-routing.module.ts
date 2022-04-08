import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PhotosComponent } from './photos/photos.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { StoreComponent } from './store/store.component';
import { PostsModule } from './posts/posts.module';
import { CategoryPostsComponent } from './posts/category-posts/category-posts.component';

const routes: Routes = [
  {path: "about", component: AboutComponent},
  {path: "store", component: StoreComponent},
  {path: "contact", component: ContactComponent},
  {path: "photos", component: PhotosComponent},
  {path: "store/product/:id", component: ProductPageComponent},
  {path: "**", component: HomepageComponent},
  //{path: "", loadChildren: "./posts/post.module#PostsModule"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PostsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
