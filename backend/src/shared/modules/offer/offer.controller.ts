import { BaseController, DocumentExistsMiddleware, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware, PrivateRouteMiddleware, UploadFileMiddleware } from '../../libs/rest/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Component, Guitar, SortType, SortTypeQuery, Strings } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { ParamOfferId, CreateOfferRequest, OfferService, OfferRdo, UpdateOfferDto, CreateOfferDto } from './index.js';
import { DEFAULT_OFFERS_COUNT } from '../../const/index.js';
import { UPLOAD_DIRECTORY } from '../../../rest/rest.constant.js';
import { SortBy } from '../../types/sort-by.enum.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
        new UploadFileMiddleware(UPLOAD_DIRECTORY, 'image'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFileMiddleware(UPLOAD_DIRECTORY, 'image'),
      ]
    });
  }

  public async index({ query: { limit, sort, direction, types, strings } }: Request, res: Response): Promise<void> {
    const count = limit ? limit as unknown as number : DEFAULT_OFFERS_COUNT;
    const sortBy = sort === SortBy.Price ? SortBy.Price : SortBy.Date;
    const sortType = direction === SortTypeQuery.Down ? SortType.Down : SortType.Up;
    const filterTypes = types ? (types as string).split(',') as Guitar[] : [];
    const filterStrings = strings ? (strings as string).split(',') as Strings[] : [];
    console.log(count, sortBy, sortType, types, strings);
    const offers = await this.offerService.find(count, sortBy, sortType, filterTypes, filterStrings);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', '');
    }
    const offerData = offer.toJSON ? offer.toJSON() : offer;
    this.ok(res, fillDTO(OfferRdo, {...offerData}));
  }

  public async create(req: CreateOfferRequest, res: Response): Promise<void> {
    const { body, file } = req;

    if (file) {
      body.image = file.filename;
      console.log(body.image);
    }

    const result = await this.offerService.create({
      ...body,
      date: new Date(),
    });

    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async update(req: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const { body, params, file } = req;

    if (file) {
      body.image = file.filename;
    }

    const updatedOffer = await this.offerService.updateById(body, params.offerId);
    if (updatedOffer) {
      const offerData = updatedOffer.toJSON ? updatedOffer.toJSON() : updatedOffer;
      this.ok(res, fillDTO(OfferRdo, {...offerData}));
    }
  }
}
