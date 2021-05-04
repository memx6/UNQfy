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

node main.js AddTrack Bad25 SmoothCriminal 550 pop

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

node main.js CreatePlayList 'my playlist' 1400 'pop' 'rock'


PrintPlayList:

node main.js PrintPlayList ‘my playlist’

DeletePlayList:

node main.js DeletePlayList 3

AddUser:

node main.js AddUser Pepe pepe@gmail.com hola

GetTracksMatchingGenres:

node main.js GetTrackMatchingGenres pop

Este fue el UML tentativo que presentamos en la reunión que tuvimos la primera semana del visado. A lo largo del trabajo se agregaron otros métodos para utilizar como subtareas y que quede mas prolijo el código, pero en cuanto a funcionalidad, se mantuvo lo presentado en el UML.


![UML-UNQFY-Grupo6](https://user-images.githubusercontent.com/62217520/117049705-e341d800-acea-11eb-896a-3f6a0c4b4f3a.png)
