import { IncomingMessage, ServerResponse } from 'node:http';
import { IUser } from '../user/user.model';

export function getBody(request: IncomingMessage, response: ServerResponse): Promise<IUser> {
  return new Promise((resolve, reject) => {
    let body: string = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: 400, message: 'Bad Request' }));
      }
    });
  });
}