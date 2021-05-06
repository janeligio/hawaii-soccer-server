const express = require("express");
const router = express.Router();
import { Game } from '../models/Game';

router.get('/')

/**
 * /api/v1/ GET - Get all local soccer games
 * /api/v1/ POST - Add a local soccer game
 */

router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).send(games);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error");
    }
})

router.post('/create', (req, res) => {
    console.log(req.body)
    const { name, email, venue, date, startTime, endTime, playerCount, notes } = req.body;

    console.log(req.body);

    const game = new Game({
        name,
        email,
        venue,
        date,
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

router.get('/join', (req, res) => {
    const gameId = req.query.id;
    const { email, playerCount } = req.body;

    Game.findById(gameId, (err, game) => {
        if(err) {
            res.status(500).json(err);
        } else {
            console.log(game);
            game.playerCount = game.playerCount + playerCount;
            game.save();
        }
    });
})

export default router;