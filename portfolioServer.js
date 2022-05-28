/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const cors = require('cors');

const api = express();

const data = require('./sampleData.json');


api.use(cors());

const HOST = '0.0.0.0';
const PORT = 8888;

api.get('/', (req, res) => {
	res.send('Welcome to EddieMoger.com');
});

api.get('/data', (req, res) => {
	res.status(200).json(data)
});

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));