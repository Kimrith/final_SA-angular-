import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cetecory',
  imports: [NgFor],
  templateUrl: './cetecory.html',
  styleUrl: './cetecory.css',
})
export class Cetecory {
  products = [
    { id: 1, name: 'Soft Drink' },
    { id: 2, name: 'Soft Drink' },
    { id: 3, name: 'Soft Drink' },
    { id: 4, name: 'Soft Drink' },
  ];
}
