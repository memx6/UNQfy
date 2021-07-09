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
  
  //PequeÃ±o Script para cargar algunas cosas para probar.
  main(['AddArtist','Michael Jackson','United States']);
  main(['AddArtist','Undertale','United States']);
  main(['AddArtist','Death Stranding','United States']);
  main(['AddAlbum','Michael Jackson','Bad 25','2012']);
  main(['AddAlbum','Michael Jackson','Thriller','1982']);
  main(['AddAlbum','Michael Jackson','dev1','1982']);
  main(['AddAlbum','Michael Jackson','dev2','1982']);
  main(['AddAlbum','Undertale','Game Theme','2015']);
  main(['AddAlbum','Undertale','Bad 25','2015']);
  main(['AddTrack','Undertale','Game Theme','Death by Glamour',500,'Pop','Games']);
  main(['AddTrack','Michael Jackson','Bad 25','Billie Jean',500,'Pop']);
  main(['AddTrack','Michael Jackson','Bad 25','Beat it',500,'Pop']);
  main(['AddTrack','Michael Jackson','Bad 25','Smooth Criminal',500,'Pop']);
  main(['AddTrack','Michael Jackson','Bad 25','Thriller',500,'Pop','Rock']);
  main(['AddTrack','Undertale','Game Theme','Death by Glamour',500,'Pop','Games']);
  main(['AddTrack','Michael Jackson','dev1',1000,'Pop']);
  main(['AddTrack','Michael Jackson','dev1','zxc',500,'Pop']);
  main(['AddTrack','Michael Jackson','dev1','qwe',500,'Pop']);
  main(['AddTrack','Michael Jackson','dev1','asd',500,'Pop','Rock']);
  main(['AddTrack','Michael Jackson','dev2','vbn',500,'Pop']);
  main(['AddTrack','Michael Jackson','dev2','bnm',500,'Pop']);
  main(['AddTrack','Michael Jackson','dev2','kln',500,'Pop']);
  main(['AddTrack','Michael Jackson','dev2','iop',500,'Pop','Rock']);
  main(['AddUser','Fede','fcito@gmail.com','1234'])
  main(['AddUser','Mau','pcxce@gmail.com','1234'])
  main(['AddUser','Joni','jopix@gmail.com','1234'])
  main(['AddUser','Juli','Jlpoah@gmail.com','1234'])
  main(['AddUser','Ger','guyqgw@gmail.com','1234'])
  main(['AddUser','Luis','Luiasdhsda@gmail.com','1234'])
  main(['CreatePlayList','dev1',1200,'Pop'])
  main(['CreatePlayList','dev2',1400,'Rock'])
  main(['CreatePlayList','dev3',1600,'Pop'])
  main(['CreatePlayList','dev4',1800,'Rock'])
  main(['CreatePlayList','dev5',2000,'Pop'])
  main(['CreatePlayList','dev6',2200,'Rock'])
  main(['CreatePlayList','dev7',2400,'Pop'])
  main(['CreatePlayList','dev8',2600,'Rock'])
  main(['AddTrack','Michael Jackson','dev1','Somebody that i used to know',500,'Pop']);
  