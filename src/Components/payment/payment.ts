import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  loggedIn = false;
  step = 0;
  choice = ''; // delivery or pickup
  qrImage = '/aba.png';
  imgCheck = '/check.png';
  showQRCode = false;
  showCash = false;

  total_Products: any[] = [];
  totalQty = 0;
  totalPrice = 0;
  toalPrice_product = 0;
  totalPriceWithDiscount = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.checkLogin();
    this.loadCart();

    // Update login & cart when storage changes
    window.addEventListener('storage', () => {
      this.checkLogin();
      this.loadCart();
    });
  }

  // ✅ Check login
  checkLogin() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  // 🛒 Load all cart products
  loadCart() {
    this.totalQty = JSON.parse(localStorage.getItem('totalqty') || '0');
    this.totalPrice = JSON.parse(localStorage.getItem('totalprice') || '0');
    this.toalPrice_product = JSON.parse(localStorage.getItem('toalPrice_product') || '0');
    this.totalPriceWithDiscount = JSON.parse(localStorage.getItem('totalpriceWithDiscount') || '0');
    this.total_Products = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getTotalQty(): number {
    return this.totalQty;
  }

  getGrandTotal(): number {
    return this.totalPriceWithDiscount;
  }

  increase(product: any) {
    product.qtyAdded++;
    product.total = (product.price - (product.price * product.discount) / 100) * product.qtyAdded;
    this.updateCartItem(product);
  }

  decrease(product: any) {
    if (product.qtyAdded > 0) {
      product.qtyAdded--;
      product.total = (product.price - (product.price * product.discount) / 100) * product.qtyAdded;
      this.updateCartItem(product);
    }
  }

  updateCartItem(product: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((item: any) => item._id === product._id);
    if (index !== -1) {
      if (product.qtyAdded === 0) {
        cart.splice(index, 1);
      } else {
        cart[index].qtyAdded = product.qtyAdded;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

  // 💳 Pay Now
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

    this.step = 1;
  }

  // ❌ Cancel order
  cancelOrder() {
    if (confirm('Are you sure you want to cancel your order?')) {
      this.clearCart();
      alert('❌ Order canceled!');
      location.reload();
    }
  }

  clearCart(): void {
    ['cartFood', 'cartSolftdrink', 'cartFruit', 'cartOther'].forEach((key) =>
      localStorage.removeItem(key)
    );
    ['totalqty', 'totalprice', 'toalPrice_product', 'totalpriceWithDiscount', 'cart'].forEach(
      (key) => localStorage.removeItem(key)
    );
    this.total_Products = [];
  }

  selectOption(option: string): void {
    this.choice = option;
    this.step = 2;
  }

  // ✅ Finalize payment and send order to backend
  pay(method: string): void {
    const orders = this.total_Products.map((product) => ({
      product_id: product._id,
      name_product: product.name_product,
      name_category: product.name_category,
      img: product.img,
      price: product.price,
      qty: product.qtyAdded,
      discount: product.discount,
      amount: product.price * product.qtyAdded * (1 - product.discount / 100),
      delivery_method: this.choice, // ✅ Include delivery method here
      customer_name: localStorage.getItem('user') || '',
      customer_phone: localStorage.getItem('phone_number') || '',
      customer_address: localStorage.getItem('address') || '',
    }));

    this.http.post('http://localhost:3000/api/order', orders).subscribe({
      next: (res) => console.log('Order saved', res),
      error: (err) => console.error(err),
    });

    if (method === 'QR Pay') {
      this.showQRCode = true;
    } else if (method === 'Cash') {
      this.showCash = true;
    }

    this.step = 0;
  }

  back(): void {
    this.step = 1;
    this.choice = '';
  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  // 🖨 Print QR Receipt
  printQR() {
    if (!this.total_Products.length) {
      alert('No products to print!');
      return;
    }
    this.printReceipt('📱 QR Payment Receipt', '#2563eb');
  }

  // 🖨 Print Cash Receipt
  printCash() {
    if (!this.total_Products.length) {
      alert('No products to print!');
      return;
    }
    this.printReceipt('💵 Cash Payment Receipt', '#16a34a');
  }

  // 🧾 Shared print function
  private printReceipt(title: string, color: string) {
    const rows = this.total_Products
      .map(
        (p, i) => `
      <tr>
        <td>${p.id || i++}</td>
        <td>${p.name || p.name_product}</td>
        <td>${p.qtyAdded}</td>
        <td>${((p.price - (p.price * p.discount) / 100) * p.qtyAdded).toFixed(2)} USD</td>
      </tr>`
      )
      .join('');

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; color: ${color}; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
            tr:nth-child(even) { background-color: #fafafa; }
            .summary { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
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
}
