import { ServerResponse } from 'node:http';
import { IUser } from '../user/user.model';

export function isBodyRequired(response: ServerResponse, body: IUser) {
  const { username, age, hobbies } = body;
  try {
    if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 400, message: 'Bad Request' }));
      return false;
    }
    if (hobbies.length > 0) {
      if (!hobbies.every(elem => typeof elem === 'string')) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: 400, message: 'Bad Request' }));
        return false;
      }
    }
  } catch {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: 500, message: 'Server error' }));
    return false;
  }
  return true;
}