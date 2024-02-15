import { IsEnum, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Guitar, Strings } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { IMAGE_MAX_LENGTH, OfferTitleLength, DescriptionLength, PriceValue, ArtikulLength } from '../../../const/index.js';

export class CreateOfferDto {
  @MinLength(OfferTitleLength.Min, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(OfferTitleLength.Max, { message: CreateOfferValidationMessage.title.maxLength })
  public title!: string;

  @MinLength(DescriptionLength.Min, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(DescriptionLength.Max, { message: CreateOfferValidationMessage.description.maxLength })
  public description!: string;

  public date!: Date;

  @IsEnum(Guitar, { message: CreateOfferValidationMessage.type.invalid })
  public type!: Guitar;

  @MaxLength(IMAGE_MAX_LENGTH, { message: CreateOfferValidationMessage.image.maxLength })
  public image!: string;

  @MinLength(ArtikulLength.Min, { message: CreateOfferValidationMessage.artikul.minLength })
  @MaxLength(ArtikulLength.Max, { message: CreateOfferValidationMessage.artikul.maxLength })
  public artikul!: string;

  @IsInt({ message: CreateOfferValidationMessage.strings.invalidFormat })
  @IsEnum(Strings, { message: CreateOfferValidationMessage.strings.invalidFormat })
  public strings!: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(PriceValue.Min, { message: CreateOfferValidationMessage.price.minValue })
  @Max(PriceValue.Max, { message: CreateOfferValidationMessage.price.maxValue })
  public price!: number;
}
