import { loadQSettings, storeQSettings } from './storage';
import { QSettings } from './types';
import { start, storeIPFS } from './ipfs';
var colors = require('colors/safe');

import { createPlugin } from './qblock';

async function main() {
  // Start IPFS
  const ipfs = await start();

  // load the Qsettings
  await loadQSettings()
    .then(async (qSettings) => {
      console.log(colors.yellow(`Plugins n: ${qSettings?.plugins?.length}`));

      if (qSettings) {
        // Create and add a new Plugin
        await createPlugin(ipfs, 'symbol', qSettings);
      }

      if (qSettings) {
        console.log('Settings: ' + JSON.stringify(qSettings));
      }
    })
    .catch(async (err) => {
      console.log(err);
      await createQSettings();
    });
}

async function createQSettings() {
  console.log('... generate QSettings');

  let qSettings: QSettings = {
    cid: '',
    date: new Date().toISOString(),
    plugins: [],
  };

  await storeQSettings(qSettings);
}

main();
