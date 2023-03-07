/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const data = require('./sampleData.json');
const projects = require('./myProjects.json');

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOST = '0.0.0.0';
const PORT = 8888;

app.get('/', (req, res) => {
	res.send('Welcome to EddieMoger.com');
});

app.get('/data', (req, res) => {
	res.status(200).json(data);
});

app.get('/getProjects', (req, res) => {
	res.status(200).json(projects);
});

app.post('/addProject', (req, res) => {
	console.log('new post!', req.body);
	projects = [...projects, req.body];
	res.status(201).send(`added Project`);
});

app.post('/removeProjectByName', (req, res) => {
	console.log('project removed!');
	projects = projects.filter((project) => project.name != req.body.name);
	res.status(201).send(`removed Project`);
});

app.patch('/updateProjectByName', (req, res) => {
	console.log('project updated!');
	projects = projects.map((project) => {
		if (project.name == req.body.name) {
			return req.body;
		}
		return project;
	});
	res.status(201).send(`updated Project`);
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

app.listen(PORT, () => console.log(`app listening at ${HOST}:${PORT}!`));
