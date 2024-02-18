import { BaseController, DocumentExistsMiddleware, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware, PrivateRouteMiddleware, UploadFileMiddleware } from '../../libs/rest/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { ParamOfferId, CreateOfferRequest, OfferService, OfferRdo, UpdateOfferDto, CreateOfferDto } from './index.js';
import { DEFAULT_OFFERS_COUNT } from '../../const/index.js';
import { UPLOAD_DIRECTORY } from '../../../rest/rest.constant.js';

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

  public async index({ query: { limit } }: Request, res: Response): Promise<void> {
    const count = limit ? limit as unknown as number : DEFAULT_OFFERS_COUNT;
    const offers = await this.offerService.find(count);
    //TODO пагинация по 7, фильтрация, сортировка
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

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
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
      console.log(body.image);
    }

    const updatedOffer = await this.offerService.updateById(body, params.offerId);
    if (updatedOffer) {
      const offerData = updatedOffer.toJSON ? updatedOffer.toJSON() : updatedOffer;
      this.ok(res, fillDTO(OfferRdo, {...offerData}));
    }
  }
}
