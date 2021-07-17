const GMailAPIClient = require('./GMailAPIClient');


const gmailClient = new GMailAPIClient();

const send = {}

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
send.send_mail= send_mail
module.exports = send;