// const mailer = (email) => {
const mailgun = require('mailgun-js');
const DOMAIN = 'https://api.mailgun.net/v3/sandbox9029a9557b7248f6b446417a411b3308.mailgun.org';
const mg = mailgun({
	apiKey: '2799e8724157c274127ba3e298a2ee5e-7dcc6512-40e1803f',
	domain: DOMAIN,
	host: 'api.eu.mailgun.net'
});
const data = {
	from: 'Leatwear <blazeeebit@gmail.com>',
	to: 'syed.nauroz.ali.syed@gmail.com',
	subject: 'Welcome to Leatwear',
	text: 'Your Registration Was A Success!!'
};
mg.messages().send(data, function(error, body) {
	console.log(body);
});
// };

// module.exports = mailer;
