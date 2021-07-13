
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
  
  //Pequeño Script para printiar set datos
  
  console.log("¡¡¡  User listen Music  !!!")
  main(['ListenMusic','7','12'])
  main(['ListenMusic','7','12'])
  main(['ListenMusic','8','12'])
  main(['ListenMusic','8','12'])
  main(['ListenMusic','8','12'])
  main(['ListenMusic','9','12'])
  main(['ListenMusic','9','12'])
  main(['ListenMusic','9','12'])
  main(['ListenMusic','9','12'])
  main(['ListenMusic','10','12'])
  main(['ListenMusic','10','12'])
  main(['ListenMusic','10','12'])
  main(['ListenMusic','10','12'])
  main(['ListenMusic','10','12'])
  main(['ListenMusic','11','12'])
  main(['PrintUser','12'])

  console.log("This is Command")
  main(['ThisIs',0])



  