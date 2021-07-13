const { response } = require('express');
const rp = require('request-promise');
const BASE_URL = 'http://localhost:3000/api/artists/'
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


