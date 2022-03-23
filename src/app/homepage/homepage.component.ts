import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title = 'Sweet Summer Store';
  subtitle = 'Summer is here! Order your favorite delicacies!';
  }