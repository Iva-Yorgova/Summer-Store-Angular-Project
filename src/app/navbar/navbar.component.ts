import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '@auth0/auth0-angular';
import { AuthService } from '../blog/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
