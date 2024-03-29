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
    "email": "memx6.mm@gmail.com",    //Este mail es el receptor
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


const send_mail = (subject,message,receiver) => {
  gmailClient.send_mail(
    subject,
    message,
    receiver,
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
}
module.exports = send_mail;