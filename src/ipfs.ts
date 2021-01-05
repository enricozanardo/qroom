import { IPFS, create } from 'ipfs';
import hasha from 'hasha';

import { QSettings } from './types';

const url = 'https://ipfs.io/ipfs';

export async function start(): Promise<IPFS> {
  const ipfs = await create();

  const version = await ipfs.version();
  console.log(`Version: ${version.version}`);

  return ipfs;
}

export async function storeIPFS<T>(ipfs: IPFS, q: T): Promise<string> {
  const path = 'qblock.enry';
  const data = Buffer.from(JSON.stringify(q));
  let cid = '';

  await ipfs.files.write(`/${path}`, data, {
    create: true,
  });

  await ipfs.files
    .stat(`/${path}`)
    .then((res) => {
      cid = res.cid;
    })
    .catch((err: Error) => {
      console.log(`No CID found: ${err}`);
    });

  const pluginUrl = `${url}/${cid}`;
  console.log('url: ' + pluginUrl);

  let cid2String = cid.toString();

  return cid2String;
}
