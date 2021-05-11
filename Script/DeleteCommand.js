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
  
//Pequeño Script para borrar algunos casos .

//Album
console.log("Ejemplo de Deletes")
console.log("       Album : ")
main(['PrintAlbum','Game Theme']);
console.log("¡¡¡  Delete Album  !!!")
main(['DeleteAlbum','5']);
main(['PrintAlbum','Game Theme']);

//Artist 
console.log("       Artist:")
main(['PrintArtist','Undertale']);
console.log("¡¡¡  Delete Artist  !!!")
main(['DeleteArtist','1']);
main(['PrintArtist','Undertale']);

//Track
console.log("       Track:")
main(['PrintTrack','Smooth Criminal']);
console.log("¡¡¡  Delete Track  !!!")
main(['DeleteTrack','10']);
main(['PrintTrack','Smooth Criminal']);

//PlayList
console.log("       PlayList:")
main(['PrintPlayList','tini<3']);
console.log("¡¡¡  Delete PlayList  !!!")
main(['DeletePlayList',18])
main(['PrintPlayList','tini<3']);

//Caso Delete en cascada
console.log("       Delete en cascada")
main(['PrintArtist','Michael Jackson']);
main(['DeleteArtist','0']);
console.log("¡¡¡  Delete Artist  !!!")
console.log("----Si se quiere obtener algun album suyo:")
main(['PrintAlbum','Thriller']);
console.log("----Si se quiere obtener algun tema suyo:")
main(['PrintTrack','Beat it']);





