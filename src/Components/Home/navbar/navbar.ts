import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Carousel } from '../carousel/carousel';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink, RouterLinkActive, Carousel, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'], // <- fixed property name
})
export class Navbar implements OnInit {
  menuOpen = false;
  loggedIn = false;
  user_name: string = '';
  searchValue: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  navItems = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'service', label: 'Services' },
    { path: 'contact', label: 'Contact' },
    { path: 'payment', label: 'Payment' },
    { path: 'setting', label: 'Setting' },
  ];

  ngOnInit() {
    this.checkLoginStatus();

    window.addEventListener('storage', () => {
      this.checkLoginStatus();
    });

    const storedUser = localStorage.getItem('user');
    this.user_name = storedUser ? storedUser : 'User None';

    const savedImage = localStorage.getItem('imgUpload');
    if (savedImage) {
      this.imgUpload = savedImage;
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
      this.loggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      localStorage.removeItem('phone_number');
      this.router.navigate(['/login']);
      localStorage.removeItem('imgUpload');
      localStorage.removeItem('address');
    } else {
      this.router.navigate(['/login']);
    }
    localStorage.removeItem('imgUpload');
    this.closeMenu();
  }

  showTopup = false;
  imgUpload: string | null = null;

  toggleTopup() {
    this.showTopup = !this.showTopup;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
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

  // ---------- Search handler ----------
  searchProduct(value: string) {
    if (!value.trim()) return;

    // Navigate to category-detail but pass search as query param
    this.router.navigate(['/category/:id'], { queryParams: { search: value } });
    this.http.get(`http://localhost:3000/api/product?search=${value}`).subscribe((res: any) => {
      console.log(res.products); // You’ll get filtered products here
    });
  }
}
