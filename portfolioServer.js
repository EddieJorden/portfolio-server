/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const cors = require('cors');

const api = express();

const data = require('./sampleData.json');

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

api.post('/addItem', (req, res) =>  {
	console.log('new post!', req.body)
	item.push(req.body)
	res.status(201).send('added Item')
})

api.get('/getItem', (req, res) => {
	res.status(200).json(item)
})

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));