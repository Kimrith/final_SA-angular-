import { NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cetecory',
  imports: [NgFor, RouterLink],
  templateUrl: './cetecory.html',
  styleUrls: ['./cetecory.css'],
})
export class Cetecory implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ categories: any[] }>('http://localhost:3000/api/cetecory').subscribe({
      next: (data) => {
        this.categories = data.categories;
      },
      error: (err) => {
        console.error('Failed to fetch categories/products', err);
      },
    });
  }
}
