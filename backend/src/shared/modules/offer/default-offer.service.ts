import { inject, injectable } from 'inversify';
import { OfferService, OfferEntity, CreateOfferDto, UpdateOfferDto } from './index.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async find(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({})
      .sort({createdAt: SortType.Down})
      .limit(count)
      .exec();
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
