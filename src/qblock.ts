import { IPFS } from 'ipfs/src';
import { v4 } from 'uuid';
import hasha from 'hasha';

import { storeQSettings, loadQSettings } from './storage';
import { QSettings, QPlugin, Qdata } from './types';

import { start, storeIPFS } from './ipfs';

const url = 'https://ipfs.io/ipfs';

export async function createPlugin(
  ipfs: IPFS,
  pluginName: string,
  qSettings: QSettings
) {
  //TODO: Create the QPlugin
  let qPlugin: QPlugin = {
    id: hasha(pluginName, { algorithm: 'sha256' }),
    name: pluginName,
  };

  // Store into IPFS
  const cid = await storeIPFS(ipfs, qPlugin);
  const pluginUrl = `${url}/${cid}`;

  await addNewPlugin(qSettings, qPlugin.id, pluginUrl);
}

async function addNewPlugin(
  qSettings: QSettings,
  id: string,
  pluginUrl: string
) {
  // Get QSettings
  let pluginData = qSettings.plugins;
  if (pluginData != undefined) {
    let qElement = pluginData.filter((qElement) => {
      if (qElement.id == id) {
        console.log('Same id found');
        // Check if the same url is already stored into the plugin
        let urls = qElement.urls.filter((url) => {
          if (url == pluginUrl) {
            console.log('Same url found');
            return qElement;
          }
        });
        console.log('how many ' + urls.length);
        // if no equal url are found
        if (urls.length == 0) {
          console.log('Update Element');
          // Update the element record
          qElement.urls.push(pluginUrl);
          // Store in the filesystem the element
          storeQSettings(qSettings);
        }

        return qElement;
      }
      return;
    });

    console.log('Here ' + qElement.length);
    // Add new Entry
    if (qElement.length == 0) {
      console.log('New Plugin found');
      let newQData: Qdata = {
        id,
        urls: [pluginUrl],
      };
      // Push the new Plugin into the QSetting file
      qSettings.plugins?.push(newQData);
      // Update the QSetting file
      storeQSettings(qSettings);
    }
  }
  console.log('Done. Plugins updated.');
}
