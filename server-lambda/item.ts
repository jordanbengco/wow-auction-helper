import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
const zlib = require('zlib');
const request: any = require('request');
const RequestPromise = require('request-promise');

exports.handle = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  callback(null, event);
};

export class ItemController {
  public static get(): void {}

  public static post(): void {}

  public static patch(): void {}
}
