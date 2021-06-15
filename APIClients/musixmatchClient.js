const rp = require('request-promise');
const RelatedResourceNotFound = require('../Errors/RelatedResourceNotFound')
const musixMatchClient = {}


const APIKEY = '22b291447c31d52ec71b45b0577bf9ac'
const BASEURL = 'http://api.musixmatch.com/ws/1.1'


musixMatchClient.getTrackLyrics = getTrackLyrics
musixMatchClient.searchTrackId = searchTrackId

async function searchTrackId(trackName) {

    const options = {
        uri: BASEURL + '/track.search',
        qs: {
            apikey: APIKEY,
            q_track: trackName,
        },
        json: true
    };

    try {
        const response = await rp.get(options).then(response => {
            let trackList = response.message.body.track_list;
            let tracksWithLyrics = trackList.filter(trackJson => trackJson.track.has_lyrics !== 0)
            return tracksWithLyrics[0].track.track_id;
        });
        return response;
    } catch (error) {
       throw new RelatedResourceNotFound()//ESTA BIEN TIRAR ESTE?
    }
}

async function getTrackLyrics(trackName) {

    let trackId = await searchTrackId(trackName)


    const options = {
        uri: BASEURL + '/track.lyrics.get',
        qs: {
            apikey: APIKEY,
            track_id: '',
        },
        json: true
    }

    options.qs.track_id = trackId


    try {
        const response = await rp.get(options).then(response => {return response});
        const lyricsBody = response.message.body.lyrics.lyrics_body;
        return lyricsBody;
    } catch (error) {
        throw new RelatedResourceNotFound();//TIRAR ERROR 500?
    }
}



module.exports = musixMatchClient


/* VERSION DE CLASE
class MusixMatchClient {

    constructor() {
        this.apikey = '22b291447c31d52ec71b45b0577bf9ac'
        this.baseURL = 'http://api.musixmatch.com/ws/1.1'
    }


    async searchTrackId(trackName) {

        const options = {
            uri: this.baseURL + '/track.search',
            qs: {
                apikey: '22b291447c31d52ec71b45b0577bf9ac',
                q_track: trackName,
            },
            json: true
        };

        try {
            const response = await rp.get(options).then(response => {
                let trackList = response.message.body.track_list
                let tracksWithLyrics = trackList.filter(trackJson => trackJson.track.has_lyrics !== 0)
                return tracksWithLyrics[0].track.track_id
            });
            return response;
        } catch (error) {
            return console.log(error);//TODO VER QUE HACER
        }
    }

    async getTrackLyrics(trackName) {

        let trackId = await this.searchTrackId(trackName)
        
        
        const options = {
            uri: this.baseURL + '/track.lyrics.get',
            qs: {
                apikey: '22b291447c31d52ec71b45b0577bf9ac',
                track_id: '',
            },
            json: true
        }

        options.qs.track_id = trackId

        
        try {
            const response = await rp.get(options).then(response => {return response});
            const lyricsBody = response.message.body.lyrics.lyrics_body;
            return lyricsBody !== '' ? lyricsBody : 'No tiene Letra';
        } catch (error) {
            return console.log(error);
        }
    }
    async asd() {
        let promesa = await (client.getTrackLyrics("Somebody i used to know"))
        console.log(promesa)
    }
}
module.exports = {
    MusixMatchClient: MusixMatchClient,
};
*/


