const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');

//other middlewares

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//middleware routes

fs.readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)));

//connect to mongodb

mongoose
	.connect(process.env.DATABASE)
	.then(() => {
		console.log('Connected to DB');
	})
	.catch((err) => {
		console.log('db connection error : ', err);
	});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
