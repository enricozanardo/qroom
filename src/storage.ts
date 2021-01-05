import os from 'os';
import fs, { readFileSync } from 'fs';
var colors = require('colors/safe');

import { QSettings } from './types';

export async function storeQSettings(qSettings: QSettings) {
  const PATH_HOME = `${os.homedir()}/qblock`;
  const PATH_QBLOCK = `${PATH_HOME}/qblock.enry`;

  if (!fs.existsSync(PATH_HOME)) {
    fs.mkdirSync(PATH_HOME);
  }

  let fullPath = PATH_QBLOCK;
  // if (fs.existsSync(fullPath)) {
  //   const stamp = new Date().toISOString();
  //   fullPath = `${PATH_HOME}/${stamp}-qsettings.enry`;
  // }

  fs.writeFileSync(fullPath, JSON.stringify(qSettings));

  console.log(colors.yellow(`\nQSettings stored to: ${fullPath}`));
}

export async function loadQSettings(): Promise<QSettings | null> {
  return new Promise<QSettings>((resolve, reject) => {
    const PATH_HOME = `${os.homedir()}/qblock`;
    const PATH_QBLOCK = `${PATH_HOME}/qblock.enry`;

    try {
      const text = fs.readFileSync(PATH_QBLOCK, 'utf8');
      const qsettings: QSettings = JSON.parse(text);

      console.log(colors.yellow(`\nQSettings loaded`));
      resolve(qsettings);
    } catch {
      reject(`It was not possible to load QSettings...`);
    }
  });
}
