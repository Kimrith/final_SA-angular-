import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Typesolfdrink } from '../typesolfdrink/typesolfdrink';
import { Typefruit } from '../typefruit/typefruit';
import { Typeoffood } from '../typeoffood/typeoffood';
import { Typeother } from '../typeother/typeother';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, Typesolfdrink, Typefruit, Typeoffood, Typeother, NgIf, NgFor],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  loggedIn = false;
  step: number = 0; // 0 = summary, 1 = delivery/pickup, 2 = payment method
  choice: string = ''; // 'delivery' or 'pickup'
  qrImage: string = '/aba.png'; // QR code image path (served from public folder)
  showQRCode: boolean = false; // Control QR code visibility
  total_Products: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const food = JSON.parse(localStorage.getItem('cartFood') || '[]');
    const drinks = JSON.parse(localStorage.getItem('cartSolftdrink') || '[]');
    const fruits = JSON.parse(localStorage.getItem('cartFruit') || '[]');
    const others = JSON.parse(localStorage.getItem('cartOther') || '[]');

    this.total_Products = [...food, ...drinks, ...fruits, ...others];
  }

  // ✅ Total Quantity
  getTotalQty(): number {
    return this.total_Products.reduce((sum, item) => sum + item.qty, 0);
  }

  // ✅ Grand Total Price
  getGrandTotal(): number {
    return this.total_Products.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  // ✅ Handle "Pay Now" button
  payNow() {
    if (this.getGrandTotal() === 0) {
      alert('🛑 Your cart is empty. Please add some items.');
      this.router.navigate(['/home']);
      return;
    }

    if (!this.loggedIn) {
      alert('⚠️ You must be logged in to proceed with payment.');
      this.router.navigate(['/login']);
      return;
    }

    this.step = 1; // Proceed to delivery/pickup step
  }

  // ✅ Cancel Order Flow
  cancelOrder() {
    if (confirm('Are you sure you want to cancel your order?')) {
      this.clearCart();
      alert('❌ Order canceled!');
      location.reload();
    }
  }

  // ✅ Clear Cart Data
  clearCart(): void {
    localStorage.removeItem('cartFood');
    localStorage.removeItem('cartSolftdrink');
    localStorage.removeItem('cartFruit');
    localStorage.removeItem('cartOther');
    this.total_Products = [];
  }

  // ✅ Delivery or Pickup Selection
  selectOption(option: string): void {
    this.choice = option;
    this.step = 2; // Proceed to payment method selection
  }

  // ✅ Payment Method Final Step
  pay(method: string): void {
    console.log(`Payment selected: ${method}`);

    if (method === 'QR Pay') {
      this.showQRCode = true; // Show QR section
      this.step = 0; // Close modal
    } else {
      alert(
        `✅ Payment successful via ${method}. Thank you for your order!\n\nTotal Price: ${this.getGrandTotal()} $\nTotal Quantity: ${this.getTotalQty()}`
      );
      this.clearCart();
      this.step = 0;
      location.reload();
    }
  }

  // ✅ Back Button
  back(): void {
    this.step = 1;
    this.choice = '';
  }

  // ✅ TrackBy for ngFor
  trackById(index: number, item: any): any {
    return item.id;
  }

  // ✅ Print QR Receipt
  printQR() {
    const printContents = document.getElementById('print-section')?.innerHTML;

    if (!printContents) {
      console.error('Print section not found!');
      return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      console.error('Failed to open print window');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          ${printContents}
          <p>Total Price: ${this.getGrandTotal()} $</p>
          <p>Total Quantity: ${this.getTotalQty()}</p>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    // Optional: clear cart after printing
    this.clearCart();
    location.reload();
  }
}
