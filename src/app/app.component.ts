import { Component,OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { RouterOutlet } from '@angular/router';
import { slider } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider
  ]
})
export class AppComponent implements OnInit {
  
  title="Airline-App";
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  prepareRoute(outlet: RouterOutlet ) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
