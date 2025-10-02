import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Typesolfdrink } from '../typesolfdrink/typesolfdrink';
import { Typefruit } from '../typefruit/typefruit';
import { Typeoffood } from '../typeoffood/typeoffood';
import { Typeother } from '../typeother/typeother';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, Typesolfdrink, Typefruit, Typeoffood, Typeother],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  loggedIn = false;

  // ✅ Combine Food + SoftDrink + Fruit + Other quantities

  ngOnInit() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  getTotalQty(): number {
    const foodCart = JSON.parse(localStorage.getItem('cartFood') || '[]');
    const foodQty = foodCart.reduce((sum: number, item: any) => sum + item.qty, 0);

    const solftDrinkCart = JSON.parse(localStorage.getItem('cartSolftdrink') || '[]');
    const drinkQty = solftDrinkCart.reduce((sum: number, item: any) => sum + item.qty, 0);

    const fruitCart = JSON.parse(localStorage.getItem('cartFruit') || '[]');
    const fruitQty = fruitCart.reduce((sum: number, item: any) => sum + item.qty, 0);

    const otherCart = JSON.parse(localStorage.getItem('cartOther') || '[]');
    const otherQty = otherCart.reduce((sum: number, item: any) => sum + item.qty, 0);

    return foodQty + drinkQty + fruitQty + otherQty;
  }

  // ✅ Combine Food + SoftDrink + Fruit + Other totals
  getGrandTotal(): number {
    const foodCart = JSON.parse(localStorage.getItem('cartFood') || '[]');
    const foodTotal = foodCart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);

    const solftDrinkCart = JSON.parse(localStorage.getItem('cartSolftdrink') || '[]');
    const drinkTotal = solftDrinkCart.reduce(
      (sum: number, item: any) => sum + item.price * item.qty,
      0
    );

    const fruitCart = JSON.parse(localStorage.getItem('cartFruit') || '[]');
    const fruitTotal = fruitCart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);

    const otherCart = JSON.parse(localStorage.getItem('cartOther') || '[]');
    const otherTotal = otherCart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);

    return foodTotal + drinkTotal + fruitTotal + otherTotal;
  }

  payNow() {
    alert('💳 Payment started!');
    // You can add redirect / API call here later
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel the order?')) {
      localStorage.removeItem('cartFood');
      localStorage.removeItem('cartSolftdrink');
      localStorage.removeItem('cartFruit');
      localStorage.removeItem('cartOther');
      alert('❌ Order canceled!');
      location.reload();
    }
  }
}
