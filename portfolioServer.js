/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const cors = require('cors');

const api = express();

const data = require('./sampleData.json');

const item = []

api.use(cors());
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
	console.log(req.body)
	item.push({postedItem: req.body})
})

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));