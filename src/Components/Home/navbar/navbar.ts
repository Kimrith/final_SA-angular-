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
  user_name: string = '';

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

    const storedUser = localStorage.getItem('user');
    this.user_name = storedUser ? storedUser : 'User None';

    const savedImage = localStorage.getItem('imgUpload');
    if (savedImage) {
      this.imgUpload = savedImage; // Load the image URL from localStorage
    }
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
      // localStorage.removeItem('isLoggedIn');
      this.loggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      localStorage.removeItem('phone_number');
      this.router.navigate(['/login']);
    } else {
      // Go to login
      this.router.navigate(['/login']);
    }
    localStorage.removeItem('imgUpload');
    this.closeMenu();
  }

  showTopup = false;
  imgUpload: string | null = null; // To store the image URL locally

  toggleTopup() {
    this.showTopup = !this.showTopup;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check size (example: max 1MB = 1,000,000 bytes)
      if (file.size > 1000000) {
        console.warn('File too large, using default image instead.');
        this.imgUpload =
          'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imgUpload = reader.result as string;
        console.log('Image loaded successfully');
      };
      reader.onerror = () => {
        console.error('Error reading file, using default image.');
        this.imgUpload =
          'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png';
      };
      reader.readAsDataURL(file);
    }
  }

  upload() {
    if (this.imgUpload) {
      localStorage.setItem('imgUpload', this.imgUpload);
      console.log('Image saved to localStorage');
    } else {
      console.log('No image selected yet.');
    }
    this.showTopup = !this.showTopup;
  }

  Remove() {
    localStorage.removeItem('imgUpload');
    window.location.reload();
  }
  // To load the image from localStorage when the component initializes (e.g., on page reload)
}
