/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
const express = require('express');

const cors = require('cors');

const api = express();

api.use(cors());

const HOST = 'localhost';
const PORT = 8888;

api.get('/', (req, res) => {
	res.send('Eddie Moger.com');
});

api.get('/data', (req, res) => {
	res.status(200).json("api is working");
});

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));