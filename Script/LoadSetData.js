const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy
const CommandInvoker = require('../Command/CommandInvoker')

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = '../data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = '../data.json') {
  unqfy.save(filename);
}


function main(filteredArgs) {
    let unqfy = getUNQfy();
    commandInvoker = new CommandInvoker();
    commandInvoker.executeCommand(filteredArgs,unqfy);
    saveUNQfy(unqfy);
  }
  const filteredArgs = process.argv.slice(2)
  main(filteredArgs);
  
  //Pequeño Script para cargar algunas cosas para probar.
  
  main(['AddArtist','Michael Jackson','United States']);
  main(['AddArtist','Undertale','United States']);
  main(['AddArtist','Death Stranding','United States']);
  main(['AddAlbum','Michael Jackson','Bad 25','2012']);
  main(['AddAlbum','Michael Jackson','Thriller','1982']);
  main(['AddAlbum','Undertale','Game Theme','2015']);
  main(['AddAlbum','Undertale','Bad 25','2015']);
  main(['AddTrack','Undertale','Game Theme','Death by Glamour',500,'Pop','Games']);
  main(['AddTrack','Michael Jackson','Bad 25','Billie Jean',500,'Pop']);
  main(['AddTrack','Michael Jackson','Bad 25','Beat it',500,'Pop']);
  main(['AddTrack','Michael Jackson','Bad 25','Smooth Criminal',500,'Pop']);
  main(['AddTrack','Michael Jackson','Bad 25','Thriller',500,'Pop','Rock']);
  main(['AddUser','Fede','fcito@gmail.com','1234'])
  main(['AddUser','Mau','pcxce@gmail.com','1234'])
  main(['AddUser','Joni','jopix@gmail.com','1234'])
  main(['AddUser','Juli','Jlpoah@gmail.com','1234'])
  main(['AddUser','Ger','guyqgw@gmail.com','1234'])
  main(['AddUser','Luis','Luiasdhsda@gmail.com','1234'])
  main(['CreatePlayList','tini<3',1400,'Pop'])
  main(['CreatePlayList','top50',2000,'Rock'])
  