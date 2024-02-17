import { Expose } from 'class-transformer';
import { Guitar, Strings } from '../../../types/index.js';
import { ObjectId } from 'mongoose';

export class OfferRdo {
  @Expose({ name: 'id' })
  public _id: ObjectId;

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
