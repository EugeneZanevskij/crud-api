import { createServer } from 'node:http';
import * as dotenv from 'dotenv';
import { requestListener } from './requestListener';

dotenv.config();

const port = process.env.PORT || 4000;
const server = createServer(requestListener);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});