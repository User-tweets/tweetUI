import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  LoggedIn=false;

  constructor(private loginService:LoginService, private router:Router, private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(val=>{
      this.LoggedIn=this.loginService.isLoggedIn();
    });
  }

  ngOnInit(): void {
    this.LoggedIn=this.loginService.isLoggedIn();
  }
  
  logoutUser(){
    this.loginService.logout();
    // this.router.navigate(['/']);
    location.href = '/';
  }

}