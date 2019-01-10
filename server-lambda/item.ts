import {APIGatewayEvent, Callback, Context} from 'aws-lambda';

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {

  switch (event.httpMethod) {
    case 'GET':
      break;
    case 'POST':
      break;
    case 'PATCH':
      break;
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({name: 'J', event: event, context: context}),
    headers: {
      'Content-Type': 'application/json',
      'Character-Encoding': 'UTF8'
    }});
};
