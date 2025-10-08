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
  usernameInput = '';
  emailInput = '';
  Pss = '';
  ComPss = '';
  phone_num = ''; // Keep as string to preserve leading zeros

  showUsernameError = false;
  showPhoneError = false;
  showEmailError = false;
  showPasswordError = false;
  showConfirmError = false;

  constructor(private router: Router) {}

  sumAdd() {
    // Reset all errors
    this.showUsernameError = false;
    this.showPhoneError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showConfirmError = false;

    // Username validation
    if (this.usernameInput.trim() === '') {
      this.showUsernameError = true;
    }

    // 📞 Phone validation — must be exactly 9 digits
    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(this.phone_num.trim())) {
      this.showPhoneError = true;
    }

    // 📧 Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.emailInput.trim() === '' || !emailPattern.test(this.emailInput)) {
      this.showEmailError = true;
    }

    // 🔒 Password validation
    if (this.Pss.trim() === '') {
      this.showPasswordError = true;
    }

    // ✅ Confirm password validation
    if (this.ComPss.trim() === '' || this.Pss !== this.ComPss) {
      this.showConfirmError = true;
    }

    // 🚀 If all valid
    if (
      !this.showUsernameError &&
      !this.showPhoneError &&
      !this.showEmailError &&
      !this.showPasswordError &&
      !this.showConfirmError
    ) {
      localStorage.setItem('user', this.usernameInput);
      localStorage.setItem('phone_number', this.phone_num);
      localStorage.setItem('isLoggedIn', 'true');
      alert('✅ Login successful!');
      window.dispatchEvent(new Event('storage'));
      this.router.navigate(['/home']);
    }
  }
}
