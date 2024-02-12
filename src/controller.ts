import { IncomingMessage, ServerResponse } from 'node:http';
import { user } from './user/user';

class Controller {
  getAll(response: ServerResponse) {
    try {
      const users = user.getAll();
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(users));
    }
    catch (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 500, message: 'Server error' }));
    }
  }
}

export const controller = new Controller();