import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './category-detail.html',
  styleUrls: ['./category-detail.css'],
})
export class CategoryDetailt implements OnInit {
  categoryId: string = '';
  products: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    this.http.get<{ products: any[] }>('http://localhost:3000/api/product').subscribe({
      next: (data) => {
        // Filter products by category and initialize quantity
        this.products = data.products
          .filter((p) => p.category === this.categoryId)
          .map((p) => {
            // Check if the product is already in the cart
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingProduct = cart.find((item: any) => item._id === p._id);

            // If product exists in cart, add its quantity
            if (existingProduct) {
              p.qtyAdded = existingProduct.qtyAdded;
            } else {
              p.qtyAdded = 0;
            }

            // Calculate total price with discount for this product
            p.total = (p.price - (p.price * p.discount) / 100) * p.qtyAdded;

            return p;
          });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  addToCart(product: any) {
    // Increment the quantity of the current product
    product.qtyAdded++;

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Find if the product already exists in the cart
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      // If product already exists, update its quantity
      existingProduct.qtyAdded = product.qtyAdded;
    } else {
      // If product does not exist, add it to the cart with the quantity
      cart.push({ ...product, qtyAdded: 1 });
    }

    // Recalculate total price with discount for the product
    product.total = (product.price - (product.price * product.discount) / 100) * product.qtyAdded;

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Recalculate total quantity, total price, and total price with discount
    this.updateTotals(cart);
  }

  updateTotals(cart: any[]) {
    // Calculate total quantity, total price, and total price with discount
    const totalQty = cart.reduce((sum, item) => sum + item.qtyAdded, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qtyAdded, 0);
    const totalPriceWithDiscount = cart.reduce(
      (sum, item) => sum + (item.price - (item.price * item.discount) / 100) * item.qtyAdded,
      0
    );

    // Save the totals in localStorage
    localStorage.setItem('totalqty', JSON.stringify(totalQty));
    localStorage.setItem('totalprice', JSON.stringify(totalPrice));
    localStorage.setItem('totalpriceWithDiscount', JSON.stringify(totalPriceWithDiscount));
  }

  // Check if the cart has any items
  hasItemsInCart(): boolean {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length > 0;
  }

  Clear() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: any) => item.category !== this.categoryId);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateTotals(cart);
    location.reload();
  }
}
