import { v4 } from 'uuid';
import { IPFS, create } from 'ipfs';
const Room = require('ipfs-pubsub-room');

const IPFS = require('ipfs');

const options = {
  repo: repo(),
  EXPERIMENTAL: {
    // enable experimental features
  },
};

async function main() {
  const node = await create(options);
  const version = await node.version();

  console.log(`Version: ${version.version}`);

  const room = new Room(node, 'ipfs-pubsub-room');

  room.on('peer joined', (peer: any) => console.log(`peer ${peer} joined`));
  room.on('peer left', (peer: any) => console.log(`peer ${peer} left`));
}

function repo() {
  return 'ipfs/pubsub-demo/' + v4();
}

main();
