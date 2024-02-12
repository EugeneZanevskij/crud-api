import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { controller } from './controller';

export function requestListener(req: IncomingMessage, res: ServerResponse) {
  const [api, users, id, ...rest] = req.url!.split('/').filter(Boolean);
  res.setHeader('Content-Type', 'application/json');
  if (api === 'api' && users === 'users' && rest.length === 0) {
    try {
      switch (req.method) {
        case 'GET':
          if (id) {
          controller.getUser(res, id);
          } else {
            controller.getAll(res);
          }
          break;
        case 'POST':
          if (id) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
          } else {
            controller.create(req, res);
          }
          break;
        case 'PUT':
          if (id) {
            controller.updateUser(req, res, id);
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
          }
          break;
        case 'DELETE':
          if (id) {
            res.writeHead(200);
            // res.end(JSON.stringify());
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
          }
          break;
        default:
          res.writeHead(405);
          res.end(JSON.stringify({ message: 'Method Not Allowed' }));
      }
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}