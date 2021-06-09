let router_albums = require('./albums')
let router_artists = require('./artists')
let router_playlists = require('./playlists')
let router_tracks = require('./tracks')

function seteoRutas(app){
    app.use('/api/albums',router_albums)
    app.use('/api/artists',router_artists)
    app.use('/api/tracks',router_tracks)
    app.use('/api/playlists',router_playlists)
    
}
module.exports.seteoRutas = seteoRutas;
