"use strict";
var exports = {"__esModule": true};
var uuid_1 = require("uuid");
var IPFS = require('ipfs');
var ipfs = new IPFS({
    repo: repo(),
    EXPERIMENTAL: {
        pubsub: true
    }
});
ipfs.once('ready', function () {
    return ipfs.id(function (err, info) {
        if (err) {
            throw err;
        }
        console.log("IPFS node ready with address " + info.id);
    });
});
function repo() {
    return 'ipfs/pubsub-demo/' + uuid_1.v4();
}
