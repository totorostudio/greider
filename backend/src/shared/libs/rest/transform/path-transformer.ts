import { inject, injectable } from 'inversify';
import { STATIC_RESOURCE_FIELDS } from './path-transformer.constant.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { STATIC_FILES_ROUTE } from '../../../../rest/index.js';
import { getFullServerPath } from '../../../helpers/index.js';
import { Config, RestSchema } from '../../config/index.js';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null;
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('PathTranformer created!');
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = STATIC_FILES_ROUTE;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = staticPath;
            current[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    }

    return data;
  }
}
