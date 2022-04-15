import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhotosComponent } from './photos/photos.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { LoginButtonComponent } from './navbar/login-button/login-button.component';
import { LogoutButtonComponent } from './navbar/logout-button/logout-button.component';
import { LoadingComponent } from './navbar/loading/loading.component';
import { StoreComponent } from './store/store.component';
import { BlogModule } from './blog/blog.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { PostsModule } from './posts/posts.module';
import { MatDialogModule } from '@angular/material/dialog'
import { MatConfirmDialogComponent } from './posts/mat-confirm-dialog/mat-confirm-dialog.component';
import { AsidePostsComponent } from './posts/aside-posts/aside-posts.component';
import { CategoryPostsComponent } from './posts/category-posts/category-posts.component';
import { FilterPipe } from './filter.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatContactDialogComponent } from './contact/mat-contact-dialog/mat-contact-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductsComponent,
    ProductComponent,
    ProductPageComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    PhotosComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    LoadingComponent,
    StoreComponent,
    FilterPipe,
    MatContactDialogComponent
    ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    AuthModule.forRoot({
       ...env.auth,
    }),
    BlogModule,
    SharedModule,
    PostsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    EditorModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  providers: [
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: HttpHeadersInterceptor,
  //   multi: true,
  // }
],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
