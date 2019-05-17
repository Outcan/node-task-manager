const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "chris.kew@outcan.uk",
    subject: "Thanks to joining in!",
    text: `Hi ${name}, welcome to the app, please let us know how you get along with the app.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "chris.kew@outcan.uk",
    subject: "Account cancelled and removed from Task Manager",
    text: `Hi ${name}, we are sorry to see you have cancelled your account. If you have five minutes please inform us on how we could coud of kept you as a client. We wish you well for the future. All the best, the TM Team.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
