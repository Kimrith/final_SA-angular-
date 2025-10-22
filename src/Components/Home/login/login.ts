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
  phone_num = '';
  addressUser = '';

  showUsernameError = false;
  showPhoneError = false;
  showEmailError = false;
  showPasswordError = false;
  showConfirmError = false;
  showAddress = false;

  constructor(private router: Router) {}

  sumAdd() {
    // Reset errors
    this.showUsernameError = false;
    this.showPhoneError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showConfirmError = false;
    this.showAddress = false;

    // Validate fields
    if (this.usernameInput.trim() === '') this.showUsernameError = true;

    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(this.phone_num.trim())) this.showPhoneError = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.emailInput.trim() === '' || !emailPattern.test(this.emailInput))
      this.showEmailError = true;

    if (this.Pss.trim() === '') this.showPasswordError = true;
    if (this.ComPss.trim() === '' || this.Pss !== this.ComPss) this.showConfirmError = true;

    if (this.addressUser.trim() === '') this.showAddress = true;

    // If all valid
    if (
      !this.showUsernameError &&
      !this.showPhoneError &&
      !this.showEmailError &&
      !this.showPasswordError &&
      !this.showConfirmError &&
      !this.showAddress
    ) {
      localStorage.setItem('user', this.usernameInput);
      localStorage.setItem('phone_number', this.phone_num);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('address', this.addressUser);
      alert('✅ Login successful!');
      window.dispatchEvent(new Event('storage'));
      this.router.navigate(['/home']);
    }
  }
}
