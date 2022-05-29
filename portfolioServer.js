/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const api = express();

const data = require('./sampleData.json');

let authorizedUsers = [{name: 'eddie'}]

let token = null

let getToken = () => {
	token = Math.floor(Math.random(9999999) * 10000000)
	let timeout = 1000 * 60
	console.log(token)
	setTimeout(() => {
		token = null
		console.log(token)
	}, timeout)
	return token
}

let item = []

api.use(express.json())
api.use(express.urlencoded({extended: false}))

const HOST = '0.0.0.0';
const PORT = 8888;

api.get('/', (req, res) => {
	res.send('Welcome to EddieMoger.com');
});

api.get('/data', (req, res) => {
	res.status(200).json(data)
});

api.get('/getUserToken', (req, res) => {
	if(authorizedUsers.findIndex(user => user.name == req.body.name) != -1) {
		if(token === null) {
			token = getToken()
		} res.status(200).json(token)
	} res.status(404).json('user not found')
	}
)

api.post('/addUser', (req, res) => {
	if(authorizedUsers.findIndex(user => user.name == req.body.name) == -1 && authorizedUsers.findIndex(user => user.email == req.body.email) == -1) {
		authorizedUsers = [...authorizedUsers, {name: req.body.name, email: req.body.email}]
		console.log('user added ', authorizedUsers)
	}
	console.log('user already exists', authorizedUsers)
		res.status(202).send('user added')
})

api.post('/addItem', (req, res) =>  {
	console.log('new post!', req.body)
	item = [...item, req.body]
	res.status(201).send(`added Item`)
})

api.post('/removeItemByName', (req, res) => {
	console.log('item removed!')
 const poppedItem = item.pop()
	console.log('poppedItem', poppedItem)
	res.status(202).send(`Removed Item`)
})

api.get('/getItem', (req, res) => {
	res.status(200).json(item)
})

api.listen(PORT, () => console.log(`API listening at ${HOST}:${PORT}!`));