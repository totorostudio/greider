import { Guitar, Strings } from './index.js';

export type Offer = {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  type: Guitar;
  image: string;
  artikul: string;
  strings: Strings;
  price: number;
}
