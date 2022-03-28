import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  viewMode = 'table';

  courses = [
    { 
      name: 'Angular', 
      description: 'Some Angular info here...' 
    },
    { 
      name: 'CSS', 
      description: 'Some CSS info here...' 
    },
    { 
      name: 'HTML', 
      description: 'Some HTML info here...' 
    },
    { 
      name: 'JavaScript', 
      description: 'Some JavaScript info here...' 
    },
    { 
      name: 'TypeScript', 
      description: 'Some TypeScript info here...' 
    }
];

onAdd() {
  this.courses.push({ 
    name: 'Database', 
    description: 'Some Database info here'
  });
}

onDelete(course: any) {
  let index = this.courses.indexOf(course);
  this.courses.splice(index, 1);
}

  ngOnInit(): void {}
}
