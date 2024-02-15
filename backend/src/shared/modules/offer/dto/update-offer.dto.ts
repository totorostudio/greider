import { Guitar, Strings } from '../../../types/index.js';
import { IsEnum, IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { IMAGE_MAX_LENGTH, OfferTitleLength, DescriptionLength, ArtikulLength, PriceValue } from '../../../const/index.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(OfferTitleLength.Min, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(OfferTitleLength.Max, { message: CreateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(DescriptionLength.Min, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(DescriptionLength.Max, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(Guitar, { message: CreateOfferValidationMessage.type.invalid })
  public type?: Guitar;

  @IsOptional()
  @MaxLength(IMAGE_MAX_LENGTH, { message: CreateOfferValidationMessage.image.maxLength })
  public image?: string;

  @IsOptional()
  @MinLength(ArtikulLength.Min, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(ArtikulLength.Max, { message: CreateOfferValidationMessage.description.maxLength })
  public artikul?: string;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.strings.invalidFormat })
  @IsEnum(Strings, { message: CreateOfferValidationMessage.strings.invalidFormat })
  public strings?: Strings;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(PriceValue.Min, { message: CreateOfferValidationMessage.price.minValue })
  @Max(PriceValue.Max, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;
}
