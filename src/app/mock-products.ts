import { Product } from './core/product';
import { Size } from './core/size';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ice Cream',
    imageUrls: ['../assets/ice-cream-prune.jpg', '../assets/ice-cream-cherry.jpg', '../assets/ice-cream-squash.jpg'],
    price: 10,
    flavors: [
      { name: 'prune', color: '#5A188E' },
      { name: 'squash', color: '#F88532' },
      { name: 'cherry', color: '#E91E63' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  },
  {
    id: 2,
    name: 'Popsicle',
    imageUrls: ['../assets/popsicle-lime.jpg', '../assets/popsicle-lettuce.jpg', '../assets/popsicle-cherry.jpg'],
    price: 8,
    flavors: [
      { name: 'lime', color: '#D1E811' },
      { name: 'lettuce', color: '#80DC0B' },
      { name: 'cherry', color: '#E91E63' },
    ],
    sizes: [Size.SMALL, Size.LARGE],
  },
  {
    id: 3,
    name: 'Cake',
    imageUrls: ['../assets/cake-choco.jpg', '../assets/cake-vanila.jpg', '../assets/cake-candy.jpg'],
    price: 10,
    flavors: [
      { name: 'choco', color: '#640420' },
      { name: 'vanila', color: '#F88532' },
      { name: 'candy', color: '#00C6C3' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  },
  {
    id: 4,
    name: 'Cookie',
    imageUrls: ['../assets/cookie-choco.jpg', '../assets/cookie-red.jpg', '../assets/cookie-vanila.jpg'],
    price: 4,
    flavors: [
      { name: 'choco', color: '#82301f' },
      { name: 'red', color: '#640420' },
      { name: 'vanila', color: '#fec28c' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  },
  {
    id: 5,
    name: 'Frozen Yogurt',
    imageUrls: ['../assets/yogurt-raspberry.jpg', '../assets/yogurt-blueberry.jpg', '../assets/yogurt-choco.jpg'],
    price: 16,
    flavors: [
      { name: 'raspberry', color: '#82301f' },
      { name: 'blueberry', color: '#640420' },
      { name: 'choco', color: '#fec28c' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  }
  
];
