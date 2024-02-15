import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, UpdateOfferDto } from './index.js';
import { City, DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  find(count: number): Promise<DocumentType<OfferEntity>[]>;
  findAuth(count: number, userId: string): Promise<DocumentType<OfferEntity>[]>;
  findUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findFullOfferInfo(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(dto: UpdateOfferDto, offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(cityName: City, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  changeFavoriteStatus(userId: string, offerId: string, status: number): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  calculateRating(offerId: string): Promise<number | null>;
  exists(documentId: string): Promise<boolean>;
}
