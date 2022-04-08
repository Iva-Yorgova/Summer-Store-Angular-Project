import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: any, term: any): any {
    if(term === undefined)
    return posts;
    return posts.filter(function(post: any){
      return post.category.toLowerCase().includes(term.toLowerCase());
    })
  }

}
