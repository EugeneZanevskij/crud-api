import { ServerResponse } from 'node:http';
import { validate as uuidValidate } from 'uuid';
import { data } from '../user/user';

export function isIdValid(response: ServerResponse, id: string) {
  try {
    if (!uuidValidate(id)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 400, message: "UserId isn't uuid" }));
      return false;
    }
    if (!data.find((user) => user.id === id)) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 404, message: "User not found" }));
      return false;
    }
  } catch {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: 500, message: "Server error" }));
    return false;
  }
  return true;
}