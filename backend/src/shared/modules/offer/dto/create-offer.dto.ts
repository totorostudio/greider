import { IsEnum, IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Guitar, Strings } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { IMAGE_MAX_LENGTH, OfferTitleLength, DescriptionLength, PriceValue, ArtikulLength } from '../../../const/index.js';

export class CreateOfferDto {
  @IsOptional()
  @MinLength(OfferTitleLength.Min, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(OfferTitleLength.Max, { message: CreateOfferValidationMessage.title.maxLength })
  public title!: string;

  @IsOptional()
  @MinLength(DescriptionLength.Min, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(DescriptionLength.Max, { message: CreateOfferValidationMessage.description.maxLength })
  public description!: string;

  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsEnum(Guitar, { message: CreateOfferValidationMessage.type.invalid })
  public type!: Guitar;

  @IsOptional()
  @MaxLength(IMAGE_MAX_LENGTH, { message: CreateOfferValidationMessage.image.maxLength })
  public image!: string;

  @IsOptional()
  @MinLength(ArtikulLength.Min, { message: CreateOfferValidationMessage.artikul.minLength })
  @MaxLength(ArtikulLength.Max, { message: CreateOfferValidationMessage.artikul.maxLength })
  public artikul!: string;

  @IsOptional()
  @IsEnum(Strings, { message: CreateOfferValidationMessage.strings.invalidFormat })
  public strings!: Strings;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(PriceValue.Min, { message: CreateOfferValidationMessage.price.minValue })
  @Max(PriceValue.Max, { message: CreateOfferValidationMessage.price.maxValue })
  public price!: number;
}
