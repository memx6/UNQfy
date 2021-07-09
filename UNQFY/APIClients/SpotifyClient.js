const { response } = require('express');
const rp = require('request-promise');
const credential = require('../spotifyCreds.json')
const BASE_URL = 'https://api.spotify.com/v1/'
const spotifyClient = {}

spotifyClient.searchArtistByName = searchArtistByName
spotifyClient.getAlbumsByArtistId = getAlbumsByArtistId
spotifyClient.getAlbumsArtistByName = getAlbumsArtistByName

async function searchArtistByName(artistName) {

    const options = {
         url: BASE_URL + 'search',
         headers: { Authorization: 'Bearer ' + credential.access_token },
         qs: {
             q: artistName,
             type: 'artist',
         },
         limit: 1,
         json: true,
    };
    return rp.get(options).then((response) => response.artists.items[0].id).catch(error => console.log(error));
}

async function getAlbumsByArtistId(artistId){

    const options = {
        url: BASE_URL + 'artists/' + artistId + '/albums',
        headers: { Authorization: 'Bearer ' + credential.access_token },
        json: true,
   };
    return rp.get(options).then((response) => response.items).catch(error => console.log(error));
}

async function getAlbumsArtistByName(artistName) {
    const artistId = await spotifyClient.searchArtistByName(artistName);
    const albums = await spotifyClient.getAlbumsByArtistId(artistId);
    return albums;
}


module.exports = spotifyClient