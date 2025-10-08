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
  step = 0; // 0 = summary, 1 = delivery/pickup, 2 = payment method
  choice = ''; // 'delivery' or 'pickup'
  qrImage = '/aba.png'; // QR image
  imgCheck = '/check.png'; // Success check image
  showQRCode = false;
  showCash = false;
  total_Products: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLogin();
    this.loadCart();

    // 🔄 Update login status dynamically when user logs in/out
    window.addEventListener('storage', () => {
      this.checkLogin();
      this.loadCart();
    });
  }

  // ✅ Check if user is logged in
  checkLogin() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  // 🛒 Load all cart products
  loadCart() {
    const food = JSON.parse(localStorage.getItem('cartFood') || '[]');
    const drinks = JSON.parse(localStorage.getItem('cartSolftdrink') || '[]');
    const fruits = JSON.parse(localStorage.getItem('cartFruit') || '[]');
    const others = JSON.parse(localStorage.getItem('cartOther') || '[]');
    this.total_Products = [...food, ...drinks, ...fruits, ...others];
  }

  // 🧮 Total Quantity
  getTotalQty(): number {
    return this.total_Products.reduce((sum, item) => sum + (item.qty || 0), 0);
  }

  // 💵 Grand Total Price
  getGrandTotal(): number {
    return this.total_Products.reduce((sum, item) => sum + (item.price * item.qty || 0), 0);
  }

  // 💳 Pay Now Button
  payNow() {
    console.log('🟢 payNow clicked');
    console.log('loggedIn:', this.loggedIn);
    console.log('grand total:', this.getGrandTotal());

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

    // ✅ If all is good, move to step 1
    this.step = 1;
  }

  // ❌ Cancel Order
  cancelOrder() {
    if (confirm('Are you sure you want to cancel your order?')) {
      this.clearCart();
      alert('❌ Order canceled!');
      location.reload();
    }
  }

  // 🧹 Clear All Carts
  clearCart(): void {
    ['cartFood', 'cartSolftdrink', 'cartFruit', 'cartOther'].forEach((key) =>
      localStorage.removeItem(key)
    );
    this.total_Products = [];
  }

  // 🚚 Delivery or 🏬 Pickup
  selectOption(option: string): void {
    this.choice = option;
    this.step = 2;
  }

  // 💰 Payment Method
  pay(method: string): void {
    if (method === 'QR Pay') {
      this.showQRCode = true;
      this.step = 0;
    } else if (method === 'Cash') {
      this.showCash = true;
      this.step = 0;
    } else {
      alert(
        `✅ Payment successful via ${method}. Thank you!\nTotal: ${this.getGrandTotal()} USD\nQuantity: ${this.getTotalQty()}`
      );
      this.clearCart();
      location.reload();
    }
  }

  // 🔙 Back Button
  back(): void {
    this.step = 1;
    this.choice = '';
  }

  // 🧾 Track items
  trackById(index: number, item: any): any {
    return item.id;
  }

  // 🖨 Print QR Receipt
  printQR() {
    if (!this.total_Products.length) {
      alert('No products to print!');
      return;
    }

    const rows = this.total_Products
      .map(
        (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>${(p.price * p.qty).toFixed(2)} USD</td>
      </tr>`
      )
      .join('');

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>QR Payment Receipt</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; color: #2563eb; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
            tr:nth-child(even) { background-color: #fafafa; }
            .summary { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h2>📱 QR Payment Receipt</h2>
          <table>
            <thead>
              <tr><th>ID</th><th>Product</th><th>Qty</th><th>Price</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="summary">
            <p>Total Quantity: ${this.getTotalQty()}</p>
            <p>Total Price: ${this.getGrandTotal().toFixed(2)} USD</p>
            <p>✅ Payment Received — Thank You!</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      this.clearCart();
      location.reload();
    };
  }

  // 🖨 Print Cash Receipt
  printCash() {
    if (!this.total_Products.length) {
      alert('No products to print!');
      return;
    }

    const rows = this.total_Products
      .map(
        (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>${(p.price * p.qty).toFixed(2)} USD</td>
      </tr>`
      )
      .join('');

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Cash Payment Receipt</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; color: #16a34a; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
            tr:nth-child(even) { background-color: #fafafa; }
            .summary { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h2>💵 Cash Payment Receipt</h2>
          <table>
            <thead>
              <tr><th>ID</th><th>Product</th><th>Qty</th><th>Price</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="summary">
            <p>Total Quantity: ${this.getTotalQty()}</p>
            <p>Total Price: ${this.getGrandTotal().toFixed(2)} USD</p>
            <p>✅ Payment Received — Thank You!</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      this.showCash = false;
      this.clearCart();
      location.reload();
    };
  }
}
