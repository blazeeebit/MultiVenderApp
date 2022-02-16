// const mailer = (email) => {
const mailgun = require('mailgun-js');
const DOMAIN = '';
const mg = mailgun({
	apiKey: '',
	domain: DOMAIN,
	host: 'api.eu.mailgun.net'
});
const data = {
	from: 'Leatwear',
	to: '',
	subject: 'Welcome to Leatwear',
	text: 'Your Registration Was A Success!!'
};
mg.messages().send(data, function(error, body) {
	console.log(body);
});
// };

// module.exports = mailer;
