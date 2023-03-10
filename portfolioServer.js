/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const data = require('./sampleData.json');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOST = '0.0.0.0';
const PORT = 8888;

let authorizedUsers = [{ name: 'eddie' }];
let token = null;

let getToken = () => {
	token = Math.floor(Math.random(9999999) * 10000000);
	let timeout = 1000 * 60;
	console.log(token);
	setTimeout(() => {
		token = null;
		console.log(token);
	}, timeout);
	return token;
};

let item = [];

app.get('/', (req, res) => {
	res.send('Welcome to EddieMoger.com');
});

app.get('/data', (req, res) => {
	res.status(200).json(data);
});

app.get('/getUserToken', (req, res) => {
	if (authorizedUsers.findIndex((user) => user.name == req.body.name) != -1) {
		if (token === null) {
			token = getToken();
		}
		res.status(200).json(token);
	}
	res.status(404).json('user not found');
});

app.post('/addUser', (req, res) => {
	if (
		authorizedUsers.findIndex((user) => user.name == req.body.name) == -1 &&
		authorizedUsers.findIndex((user) => user.email == req.body.email) == -1
	) {
		authorizedUsers = [
			...authorizedUsers,
			{ name: req.body.name, email: req.body.email },
		];
		console.log('user added ', authorizedUsers);
	}
	console.log('user already exists', authorizedUsers);
	res.status(202).send('user added');
});

app.post('/addItem', (req, res) => {
	console.log('new post!', req.body);
	item = [...item, req.body];
	res.status(201).send(`added Item`);
});

app.post('/removeItemByName', (req, res) => {
	console.log('item removed!');
	const poppedItem = item.pop();
	console.log('poppedItem', poppedItem);
	res.status(202).send(`Removed Item`);
});

app.get('/getItem', (req, res) => {
	res.status(200).json(item);
});

const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;

app.post('/send-email', (req, res) => {
	// Get the form data from the request body
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;

	// Create a reusable transporter object using SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: user,
			pass: pass,
		},
	});

	// Setup email data with unicode symbols
	let mailOptions = {
		from: `"${name}: ${email} " <${email}>`, // sender address
		replyTo: email, // reply to address
		to: 'eddie@eddiemoger.com', // list of receivers
		subject: 'New message from EddieMoger.com', // Subject line
		text: message, // plain text body
		html: `<p>${message}</p>`, // html body
	};

	// Send the email using the transporter object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send('An error occurred while sending the email');
		} else {
			console.log('Email sent:', info.response);
			res.status(200).send('Email sent successfully');
		}
	});
});

app.listen(PORT, () => console.log(`Server listening at ${HOST}:${PORT}!`));
