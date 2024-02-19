import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, UpdateOfferDto } from './index.js';
import { DocumentExists, Guitar, SortBy, SortType, Strings } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  find(count: number, sortBy: SortBy, sortType: SortType, filterTypes: Guitar[], filterStrings: Strings[]): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(dto: UpdateOfferDto, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
