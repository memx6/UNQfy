
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
  const newsletterObserver = new NewsletterObserver();
  const dependecyTransformer = new DependencyTransformer(newsletterObserver);
    unqfy.addObserver(dependecyTransformer);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

module.exports = utils