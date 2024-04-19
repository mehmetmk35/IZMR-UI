import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
   
  constructor(private authService:AuthService,private router: Router) {}
  signOut(){

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // localStorage.removeItem('company');
    // localStorage.removeItem('business');
    // localStorage.removeItem('branch');
    // localStorage.removeItem('username');
    // localStorage.removeItem('password');
    this.authService.identityCheck();
    this.router.navigateByUrl('/login');
    
  }
}

