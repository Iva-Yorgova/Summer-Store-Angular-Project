import { Component, Input} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title = 'Sweet Summer Store';
  subtitle = 'Summer is here! Order your favorite delicacies!';

  constructor(public auth: AuthService) {}

  
  }