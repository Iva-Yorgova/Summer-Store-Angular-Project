import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  viewMode = 'table';

  products = [
    { 
      name: 'Ice Cream', 
      flavors: 'prune, squash, cherry',
      price: '$10.00'
    },
    { 
      name: 'Popsicle', 
      flavors: 'lime, lettuce, cherry',
      price: '$8.00' 
    },
    { 
      name: 'Cake', 
      flavors: 'choco, vanila, candy',
      price: '$20.00'
    },
    { 
      name: 'Cookie', 
      flavors: 'choco, red, vanila',
      price: '$4.00' 
    },
    { 
      name: 'Frozen Yogurt', 
      flavors: 'raspberry, blueberry, choco',
      price: '$16.00' 
    }
];


  ngOnInit(): void {}
}
