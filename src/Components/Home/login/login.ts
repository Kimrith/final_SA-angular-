import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  usernameInput: string = '';
  emailInput: string = '';
  Pss: string = '';
  ComPss: string = '';

  showUsernameError = false;
  showEmailError = false;
  showPasswordError = false;
  showConfirmError = false;

  constructor(private router: Router) {}

  sumAdd() {
    // Reset all error flags
    this.showUsernameError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showConfirmError = false;

    // Username validation
    if (this.usernameInput.trim() === '') {
      this.showUsernameError = true;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.emailInput.trim() === '' || !emailPattern.test(this.emailInput)) {
      this.showEmailError = true;
    }

    // Password validation
    if (this.Pss.trim() === '') {
      this.showPasswordError = true;
    }

    // Confirm password validation
    if (this.ComPss.trim() === '' || this.Pss !== this.ComPss) {
      this.showConfirmError = true;
    }

    // ✅ If no errors, navigate to home
    // Inside your sumAdd() method in login.ts

    if (
      !this.showUsernameError &&
      !this.showEmailError &&
      !this.showPasswordError &&
      !this.showConfirmError
    ) {
      localStorage.setItem('user', this.usernameInput);
      localStorage.setItem('isLoggedIn', 'true'); // ✅ Add this line
      alert('✅ Login successful!');
      window.dispatchEvent(new Event('storage')); // Notify other components
      this.router.navigate(['/home']);
    }
  }
}
