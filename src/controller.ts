import { IncomingMessage, ServerResponse } from 'node:http';
import { user } from './user/user';
import { getBody } from './helpers/getBody';
import { isBodyRequired } from './helpers/isBodyRequired';
import { isIdValid } from './helpers/isIdValid';

class Controller {
  getAll(response: ServerResponse) {
    try {
      const users = user.getAll();
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(users));
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 500, message: 'Server error' }));
    }
  }

  async create(request: IncomingMessage, response: ServerResponse) {
    try {
      const body = await getBody(request, response);
      const isValid = isBodyRequired(response, body);
      if (isValid) {
        const createdUser = user.create(body);
        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(createdUser));
        return;
      }    
    } catch {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 500, message: 'Server error' }));
    }
  }

  getUser(response: ServerResponse, id: string) {
    try {
      const isId = isIdValid(response, id);
      if (isId) {
        const userFound = user.findUserById(id);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(userFound));
      }
    } catch {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 500, message: "Server error" }));
    }
  }

  async updateUser(request: IncomingMessage, response: ServerResponse, id: string) {
    try {
      const isId = isIdValid(response, id);
      if (isId) {
        const body = await getBody(request, response);
        const isBodyValid = isBodyRequired(response, body);
        if (isBodyValid) {
          const updatedUser = user.update(id, body);
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(updatedUser));
        }
      }
    } catch {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 500, message: 'Server error' }));
    }
  }

  deleteUser(response: ServerResponse, id: string) {
    try {
      const isId = isIdValid(response, id);
      if (isId) {
        const deletedUser = user.delete(id);
        response.writeHead(204, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(deletedUser));
      }
    } catch {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 500, message: 'Server error' }));
    }
  }
}

export const controller = new Controller();