# UNQfy

Patrón de diseño utilizado: 
El patron command:

Adaptamos el patrón command para nuestra conveniencia a lo largo del trabajo.
Optamos por ello ya que vimos que era una buena solución para actuar como
nexo entre nuestro modelo (el unqfy) y la consola. La clase invocadora
es el Command Invoker puesto que es el responsable de tomar lo ingresado
por consola y transformarlo en solicitudes para nuestros comandos.
Luego, nuestros comandos se encargan de delegar al unqfy la tarea que cada
uno conlleva, realizando en algunos casos ciertas validaciones.

Ejemplos de los comandos implementados:


AddArtist:

node main.js AddArtist MichaelJackson UnitedStates

PrintArtist:

node main.js PrintArtist MichaelJackson

AddAlbum:

node main.js AddAlbum MichaelJackson Bad25 2012

PrintAlbum:

node main.js PrintAlbum Bad25

AddTrack:

node main.js AddTrack MichaelJackson Bad25 SmoothCriminal 550 pop

PrintTrack:

node main.js PrintTrack SmoothCriminal


Aclaracion sobre deletes:
Como le damos la posibilidad al usuario de poder ver los datos de cualquier clase con los prints, consideramos que la opción correcta era borrar por ID, más si consideramos que albums y tracks pueden llegar a tener nombres repetidos.


DeleteTrack:


node main.js DeleteTrack 2


DeleteAlbum:

node main.js DeleteAlbum 1


DeleteArtist:

node main.js DeleteArtist 0


CreatePlaylist:

node main.js CreatePlayList 'my playlist' 1400 Pop Rock


PrintPlayList:

node main.js PrintPlayList ‘my playlist’

DeletePlayList:

node main.js DeletePlayList 3

AddUser:

node main.js AddUser Pepe pepe@gmail.com hola

UNQfy tambien nos permite realizar busquedas de tracks segun el artista que los interpreta y segun su genero con los comandos GetTracksMatchingArtist que recibe el nombre del artista por el cual buscar y GetTracksMatchingGenres que recibe una lista de genero por los cuales realizar la busqueda.

node main.js GetTracksMatchingArtist 'Michael Jackson'

node main.js GetTracksMatchingGenres Pop Rock

Como una funcionalidad interesante el UNQfy por medio del comando GetMatchingPartial nos devuelve las tracks, álbumes o artistas por matching parcial del string recibido como parámetro contra el nombre de de cada una de las entidades, en caso de no encontrar alguno de las entidades nos avisará que para el partial String ingresado no se encontraron Matching.

node main.js GetMatchingPartial bad

ThisIs:

node main.js ThisIs 0
*donde el número pasado es el ID de artista

ListenMusic:
node main.js 0 1

*donde el primer parámetro es el id de usuario y el segundo el id de track


Este fue el UML tentativo que presentamos en la reunión que tuvimos la primera semana del visado. A lo largo del trabajo se agregaron otros métodos para utilizar como subtareas y que quede mas prolijo el código, pero en cuanto a funcionalidad, se mantuvo lo presentado en el UML.



![UML-UNQFY-Grupo6](https://user-images.githubusercontent.com/37801469/117866382-72139f00-b26d-11eb-9ab3-dcc3108eebbd.jpg)

