import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  current = 0;
  intervalId: any;

  slides = [
    {
      image: 'https://i.pinimg.com/1200x/34/eb/75/34eb75d5d66fc39656f322ac93bc2206.jpg',
    },
    {
      image: 'https://i.pinimg.com/736x/65/3c/24/653c24878fc90171f02029138207dd50.jpg',
    },
    {
      image: 'https://i.pinimg.com/1200x/53/4e/12/534e125e5a0f94ba2ea3bf7716985d38.jpg',
    },
    {
      image: 'https://i.pinimg.com/1200x/5f/39/f2/5f39f213a8e28cd93cc2e9891fe5346c.jpg',
    },
  ];
  ngOnInit(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.current = (this.current + 1) % this.slides.length;
  }

  prevSlide() {
    this.current = this.current === 0 ? this.slides.length - 1 : this.current - 1;
  }
}
