const express = require('express');
const cors = require('cors');
import { connect } from './mongodb';
import games from './api/games';
import venues from './api/venues';

const app = express().use(express.json()).use(cors());

const PORT = 8080;

// Connect to MongoDB
connect()
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.error.bind(err, 'MongoDB error:'));

app.get('/', async (req, res) => {
    res.send('Bootstrapped node typescript application.');
});

// Routes

app.use('/games', games);
app.use('/venues', venues);

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    } else {
        console.log(`Server listening on PORT:${PORT}`);
    }
});
