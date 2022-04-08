import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';  
import { MatDialogModule } from '@angular/material/dialog'

import { RouterModule, Routes } from '@angular/router';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { AsidePostsComponent } from './aside-posts/aside-posts.component';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { CategoryPostsComponent } from './category-posts/category-posts.component';

const routes: Routes = [
  {path: 'blog', component: PostListComponent},
  {path: 'blog/:id', component: PostDetailComponent},
  {path: 'category', component: CategoryPostsComponent},
  {path: 'dashboard', component: PostDashboardComponent}
]

@NgModule({
  declarations: [
    PostDashboardComponent,
    PostDetailComponent,
    PostListComponent,
    MatConfirmDialogComponent,
    AsidePostsComponent,
    LatestPostsComponent,
    CategoryPostsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [ PostService ]
})
export class PostsModule { }
