const rp = require('request-promise');
const credential = require('../spotifyCreds.json')
const BASE_URL = 'https://api.spotify.com/v1/'
const spotifyClient = {}

spotifyClient.searchArtistByName = searchArtistByName
spotifyClient.getAlbumsByArtistId = getAlbumsByArtistId
spotifyClient.getAlbumsArtistByName = getAlbumsArtistByName

async function searchArtistByName(artistName) {

    const options = {
         url: BASE_URL + `search?q=${artistName}&type=artist`,
         headers: { Authorization: 'Bearer ' + credential.access_token },
         limit: 1,
         json: true,
    };
    return rp.get(options).then((response) => response.artist.items[0].id);
}

async function getAlbumsByArtistId(artistId){

    const options = {
        url: BASE_URL + `artists/${artistId}/albums`,
        headers: { Authorization: 'Bearer ' + credential.access_token },
        json: true,
   };
   return rp.get(options).then((response) => response.items);
}

async function getAlbumsArtistByName(artistName) {
    const artist = await this.searchArtistByName(artistName);
    const albums = await this.getAlbumsByArtistId(artist.id);
    return albums;
}

module.exports = spotifyClient