import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cetecory',
  imports: [NgFor, NgClass],
  templateUrl: './cetecory.html',
  styleUrl: './cetecory.css',
})
export class Cetecory {
  products = [
    { id: 1, name: 'Food' },
    { id: 1, name: 'Solf Drink' },
    { id: 1, name: 'Fruit' },
    { id: 8, name: 'Other' },
  ];
}
