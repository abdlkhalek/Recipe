import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.servic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipe';

  constructor(private authService: AuthService) {}

  
  ngOnInit(): void {
    this.authService.autoLogin();
  }



  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

}
