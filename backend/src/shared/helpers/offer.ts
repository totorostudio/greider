import { Guitar, Strings, Offer } from '../types/index.js';

export function createOffer(data: string): Offer {
  const [title, description, date, type, image, artikul, strings, price] = data.replace('\n', '').split('\t');

  return {
    title,
    description,
    date: new Date(date),
    type: type as Guitar,
    image,
    artikul,
    strings: parseInt(strings, 10) as Strings,
    price: Number.parseInt(price, 10),
  };
}
