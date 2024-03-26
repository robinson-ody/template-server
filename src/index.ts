import './db';
import './env';

import { randomLightChalk } from 'ody-utils';
import { Server } from 'socket.io';
import { app } from './app';
import { EnvMissingError } from './errors/env-missing';
import { initiate_super_admin } from './services/user/initiate-master';

const port = process.env.PORT;
if (!port) throw new EnvMissingError('PORT');

const node_server = app.listen(port, () =>
  randomLightChalk(`🚀 listening on port ${port}`)
);

const io = new Server(node_server, {
  cors: { origin: ['http://localhost:3000'] },
});

io.on('connection', socket => {
  const { size } = io.sockets.sockets;
  randomLightChalk(`[ socket ] client connected. ${size} connections`);

  socket.on('disconnect', () =>
    randomLightChalk(`[ socket ] client disconnected. ${size} connections`)
  );
});

(async () => {
  await initiate_super_admin();
})();

export { io };
