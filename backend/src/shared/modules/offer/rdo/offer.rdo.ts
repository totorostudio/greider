import { Expose } from 'class-transformer';
import { Guitar, Strings } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public type: Guitar;

  @Expose()
  public image: string;

  @Expose()
  public artikul: string;

  @Expose()
  public strings: Strings;

  @Expose()
  public price: number;
}
