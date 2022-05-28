/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const cors = require('cors');

const data = require('./api');



console.log('data here', data);

const api = express();

api.use(cors());

const HOST = 'localhost';
const PORT = 8888;

api.get('/', (req, res) => {
	res.send('Eddie Moger.com');
});

api.get('/data', (req, res) => {
	res.status(200).json(data);
});

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));