import { defaultClasses, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { DescriptionLength, OfferTitleLength, PriceValue } from '../../const/index.js';
import { Guitar, Strings } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    require: true,
    minlength: OfferTitleLength.Min,
    maxlength: OfferTitleLength.Max,
  })
  public title!: string;

  @prop({
    require: true,
    minlength: DescriptionLength.Min,
    maxlength: DescriptionLength.Max,
  })
  public description!: string;

  @prop({
    require: true,
    default: new Date(),
  })
  public date!: Date;

  @prop({
    type: () => String,
    enum: Guitar,
    require: true,
  })
  public type!: Guitar;

  @prop({
    require: true,
  })
  public image!: string;

  @prop({
    require: true,
    default: false,
  })
  public artikul!: string;

  @prop({
    type: () => String,
    enum: Strings,
    require: true,
  })
  public strings!: Strings;

  @prop({
    require: true,
    min: PriceValue.Min,
    max: PriceValue.Max,
  })
  public price!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
