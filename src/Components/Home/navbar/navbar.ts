import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Carousel } from '../carousel/carousel';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink, RouterLinkActive, Carousel],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  menuOpen = false;
  loggedIn = false;

  constructor(private router: Router) {}

  navItems = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'service', label: 'Services' },
    { path: 'contact', label: 'Contact' },
    { path: 'payment', label: 'Payment' },
  ];

  ngOnInit() {
    this.checkLoginStatus();

    // 👂 Listen for login/logout changes from anywhere
    window.addEventListener('storage', () => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  handleLoginLogout() {
    if (this.loggedIn) {
      // Logout
      localStorage.removeItem('isLoggedIn');
      this.loggedIn = false;
      window.dispatchEvent(new Event('storage'));
      this.router.navigate(['/login']);
    } else {
      // Go to login
      this.router.navigate(['/login']);
    }

    this.closeMenu();
  }
}
