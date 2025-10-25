import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './category-detail.html',
  styleUrls: ['./category-detail.css'],
})
export class CategoryDetailt implements OnInit {
  categoryId: string = '';
  products: any[] = [];
  searchQuery: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Listen for query params (search)
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.categoryId = this.route.snapshot.paramMap.get('name') || '';
      this.fetchProducts();
    });
  }

  fetchProducts() {
    this.http.get<{ products: any[] }>('http://localhost:3000/api/product').subscribe({
      next: (data) => {
        let products = data.products;

        // Filter by category if categoryId exists
        if (this.categoryId) {
          products = products.filter((p) => p.category === this.categoryId);
        }

        // Filter by search query if exists
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          products = products.filter((p) => p.name_product.toLowerCase().includes(query));
        }

        // Initialize qtyAdded and total for cart
        this.products = products.map((p) => {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const existingProduct = cart.find((item: any) => item._id === p._id);
          p.qtyAdded = existingProduct ? existingProduct.qtyAdded : 0;
          p.total = (p.price - (p.price * p.discount) / 100) * p.qtyAdded;
          return p;
        });
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  addToCart(product: any) {
    product.qtyAdded++;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: any) => item._id === product._id);
    if (existingProduct) {
      existingProduct.qtyAdded = product.qtyAdded;
    } else {
      cart.push({ ...product, qtyAdded: 1 });
    }
    product.total = (product.price - (product.price * product.discount) / 100) * product.qtyAdded;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateTotals(cart);
  }

  updateTotals(cart: any[]) {
    const totalQty = cart.reduce((sum, item) => sum + item.qtyAdded, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qtyAdded, 0);
    const totalPriceWithDiscount = cart.reduce(
      (sum, item) => sum + (item.price - (item.price * item.discount) / 100) * item.qtyAdded,
      0
    );
    localStorage.setItem('totalqty', JSON.stringify(totalQty));
    localStorage.setItem('totalprice', JSON.stringify(totalPrice));
    localStorage.setItem('totalpriceWithDiscount', JSON.stringify(totalPriceWithDiscount));
  }

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
