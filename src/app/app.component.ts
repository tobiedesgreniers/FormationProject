import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myproject';
  profile: any;

  constructor(private auth: AuthService){
    this.auth.handleAuthentication();
    this.auth.scheduleRenewal();
  }

  goToLogout() {
    window.location.href = 'https://tobiedesgreniers.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:4200&client_id=WuXQkFErB9vls4TL9iyULjAo05OZi755';
  }
}
