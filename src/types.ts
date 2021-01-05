export type QSettings = {
  cid: string;
  date: string;
  plugins?: Qdata[];
};

export type QPlugin = {
  id: string;
  name: string;
  protoFile?: Buffer;
  namespaceFile?: Buffer;
  version?: number;
  date?: string;
};

export type Qdata = {
  id: string;
  urls: string[];
};
