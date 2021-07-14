
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const DependencyTransformer = require('./APIClients/DependencyTransformer');
const NewsletterObserver = require('./APIClients/newsLetterObserver');


const utils = {}

utils.getUNQfy = getUNQfy
utils.saveUNQfy = saveUNQfy


// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  if (unqfy.observers.length === 0){
    const dependencyTransformerForAlbumAddition = new DependencyTransformer("album added",NewsletterObserver.notifyAlbumAddition);
    const dependencyTransformerForArtistDeletion = new DependencyTransformer("artist deleted",NewsletterObserver.notifyArtistDeletion);
    unqfy.addObserver(dependencyTransformerForAlbumAddition);
    unqfy.addObserver(dependencyTransformerForArtistDeletion);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

module.exports = utils;