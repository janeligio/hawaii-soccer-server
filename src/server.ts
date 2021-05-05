const express = require("express");
import { connect } from './mongodb';
import { Game } from './models/Game';

const app = express();
app.use(express.json());

const port = 8080;

// Connect to MongoDB
connect()
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) =>  console.error.bind(err, "MongoDB error:"));

app.get('/', async (req, res) => {
    res.send("Bootstrapped node typescript application.");
});

// Routes


/**
 * /api/v1/ GET - Get all local soccer games
 * /api/v1/ POST - Add a local soccer game
 */

app.get('/api/v1', (req, res) => {

})

app.post('/api/v1/create', (req, res) => {
    console.log(req.body)
    const { name, venue, startTime, endTime, playerCount, notes } = req.body;

    console.log(name);
    console.log(venue);
    console.log(startTime);
    console.log(endTime);
    console.log(playerCount);
    console.log(notes);

    const game = new Game({
        name,
        venue,
        startTime,
        endTime,
        playerCount,
        notes
      });

    game.save(err => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).send("Successfully created game");
        }
    });
})

app.listen(port, err => {
    if(err) {
        return console.error(err);
    } else {
        console.log(`Server listening on PORT:${port}`);
    }
});