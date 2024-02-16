import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { OfferGenerator } from './index.js';
import { MockServerData, Strings, Guitar } from '../../types/index.js';
import { generateRandomValue, getRandomItem } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_PRICE = 100;
const MAX_PRICE = 1000000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const type = getRandomItem<string>(Object.keys(Guitar)) as keyof typeof Guitar;
    const image = getRandomItem<string>(this.mockData.images);
    const artikul = nanoid();
    const strings = getRandomItem(Object.values(Strings));
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);

    return [
      title, description, date, type, image, artikul, strings, price
    ].join('\t');
  }
}
