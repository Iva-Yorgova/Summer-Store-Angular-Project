import { Component } from '@angular/core';
//import { AuthService } from '@auth0/auth0-angular';
import { AuthService } from './blog/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sweet Summer Store';
  subtitle = 'Summer is here! Order your favorite delicacies!';

  constructor(public auth: AuthService) {}
}
