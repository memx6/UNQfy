const { response } = require('express');
const UNQFY_PORT = process.env["UNQFY-PORT"] || 3000;
const rp = require('request-promise');
const BASE_URL = `http://localhost:${UNQFY_PORT}/api/artists/`
const objetito = {}

objetito.artistExists = artistExists

async function artistExists(artistId) {

    const options = {
         url: BASE_URL + artistId,
         json: true,
    };
    return rp.get(options).then((_) => true).catch((_) => false);
}

module.exports = objetito


