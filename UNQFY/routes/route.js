const router_albums = require('./albums');
const router_artists = require('./artists');
const router_playlists = require('./playlists');
const router_tracks = require('./tracks');
const router_users = require('./users');
const router_invalidRoute = require('./invalidRoute');
const router_isAlive = require("./isAlive");

function seteoRutas(app){
    app.use('/api/albums',router_albums);
    app.use('/api/artists',router_artists);
    app.use('/api/tracks',router_tracks);
    app.use('/api/playlists',router_playlists);
    app.use('/api/users',router_users);
    app.use('/api/is-alive',router_isAlive);
    app.use('*', router_invalidRoute);
}
module.exports.seteoRutas = seteoRutas;
