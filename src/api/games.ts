const express = require("express");
const router = express.Router();
import { Game } from '../models/Game';

router.get('/')

/**
 * /api/v1/ GET - Get all local soccer games
 * /api/v1/ POST - Add a local soccer game
 */

router.get('/', (req, res) => {

})

router.post('/create', (req, res) => {
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

export default router;