const GMailAPIClient = require('./GMailAPIClient');


const gmailClient = new GMailAPIClient();

gmailClient.send_mail(
  "Hello3",
  [
    'This is a message just to say hello.',
    'So... <b>Hello!</b> ❤️😎'
  ],
  {
   /* "name": "Lautaro Woites",
    "email": "lautaro.woites@gmail.com",*/
    "name": "UNQfy newsletter",
    "email": "memx6.mm@gmail.com",    
  },
  {
     "name": "UNQfy newsletter",
     "email": "trejojulian998@gmail.com",    
   },
  {
    "name": "UNQfy newsletter",
    "email": "unqfy@gmail.com",
  }
).then( (gmailResponse) => {
  console.log("Mail enviado!");
  console.log(gmailResponse);
}).catch( (error) => {
  console.error("Algo salió mal");
  console.error(error);
})