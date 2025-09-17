import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Carousel } from '../carousel/carousel';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, RouterLink, NgFor, NgIf, RouterLinkActive, Carousel],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = false;
  constructor(private router: Router) {}

  // Define active styling
  activeClass = 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1';
  inactiveClass = 'text-gray-700 hover:text-blue-600 transition duration-150';

  // Check active route
  isActive(path: string): boolean {
    return this.router.url === path;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  navItems = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'service', label: 'Services' },
    { path: 'contact', label: 'Contact' },
    { path: 'login', label: 'Login' },
  ];
}
