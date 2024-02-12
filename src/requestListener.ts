import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export function requestListener(req: IncomingMessage, res: ServerResponse) {
  const [api, users, id, ...rest] = req.url.split('/').filter(Boolean);
  res.setHeader('Content-Type', 'application/json');
  if (api === 'api' && users === 'users' && rest.length === 0) {
    try {
      switch (req.method) {
        case 'GET':
          if (id) {
          //   if (uuidValidate(id)) {
          //     const user = users.find((u) => u.id === id);
          //     if (user) {
          //       res.writeHead(200);
          //       res.end(JSON.stringify(user));
          //     } else {
          //       res.writeHead(404);
          //       res.end(JSON.stringify({ message: 'User not found' }));
          //     }
          //   } else {
          //     res.writeHead(400);
          //     res.end(JSON.stringify({ message: 'Invalid userId' }));
          //   }
          } else {
            res.writeHead(200);
            res.end(JSON.stringify(users));
          }
          break;
        case 'POST':
          break;
        case 'PUT':
          break;
        case 'DELETE':
          break;
        default:
      }
    } catch {

    }
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
}