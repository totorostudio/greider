import { Guitar, Strings } from './index.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  type: Guitar;
  image: string;
  artikul: string;
  strings: Strings;
  price: number;
}
