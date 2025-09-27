import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cetecory',
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './cetecory.html',
  styleUrl: './cetecory.css',
})
export class Cetecory {
  products = [
    { path: 'food', id: 1, name: 'Food' },
    { path: 'solf_drink', id: 1, name: 'Solf Drink' },
    { path: 'fruit', id: 1, name: 'Fruit' },
    { path: 'other', id: 8, name: 'Other' },
  ];
}
