import { inject, injectable } from 'inversify';
import { OfferService, OfferEntity, CreateOfferDto, UpdateOfferDto } from './index.js';
import { Component, SortType, SortBy, Guitar, Strings } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';

interface Filter {
  type?: { $in: Guitar[] };
  strings?: { $in: Strings[] };
}

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async find(queryLimit: number, queryPage: number, sortBy: SortBy, sortType: SortType, filterTypes: Guitar[], filterStrings: Strings[]): Promise<{offers: DocumentType<OfferEntity>[], total: number}> {
    const sortKey = sortBy === SortBy.Price ? 'price' : 'createdAt';
    const sortValue = sortType === SortType.Down ? SortType.Down : SortType.Up;
    const filter: Filter = {};

    if (filterTypes.length > 0) {
      filter.type = { $in: filterTypes };
    }

    if (filterStrings.length > 0) {
      filter.strings = { $in: filterStrings };
    }

    const total = await this.offerModel.countDocuments(filter);

    const offers = await this.offerModel
    .find(filter)
    .sort({[sortKey]: sortValue})
    .limit(queryLimit)
    .skip(queryLimit * (queryPage - 1))
    .exec();

    return { offers, total };
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .exec();
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({...dto, date: new Date()});
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async updateById(dto: UpdateOfferDto, offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId).exec();

    if (!offer) {
      throw new Error('Offer not found');
    }

    const updatedOffer = await this.offerModel.findByIdAndUpdate(offerId, dto, {new: true}).exec();
    return updatedOffer;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId).exec();

    if (!offer) {
      throw new Error('Offer not found');
    }

    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
