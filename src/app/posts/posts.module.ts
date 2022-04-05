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


import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'blog', component: PostListComponent},
  {path: 'blog/:id', component: PostDetailComponent},
  {path: 'dashboard', component: PostDashboardComponent}
]

@NgModule({
  declarations: [
    PostDashboardComponent,
    PostDetailComponent,
    PostListComponent
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
    MatProgressBarModule
  ],
  providers: [ PostService ]
})
export class PostsModule { }
