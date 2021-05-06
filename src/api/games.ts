const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
import { Game } from '../models/Game';
import { Venue } from '../models/Venue';

import { MAIL_USERNAME, MAIL_PASS, clientID, clientSecret, refreshToken } from '../config/keys';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: MAIL_USERNAME,
        pass: MAIL_PASS,
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
})
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
    const { email, name, playerCount } = req.body;

    Game.findById(gameId, (err, game) => {
        if(err) {
            res.status(500).json(err);
        } else {
            // Email the organizer
            Venue.findById(game.venue, (err, venue) => {
                const mailOptions = {
                    from: MAIL_USERNAME,
                    to: game.email,
                    subject: `Hawaii Five-a-Side Notification: Person has joined your game!`,
                    text: `${name} has joined your game at ${venue.name} from ${game.startTime}-${game.endTime}. Contact them at ${email}.`
                }

                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        console.log("Error sending mail: " + err);
                        res.status(500).send("Error sending mail");
                    } else {
                        console.log("Successfully notified organizer");
                        // Update playercount of the game document
                        game.playerCount = game.playerCount + (playerCount || 1);
                        game.save();
                        res.status(200).send("Email notification sent.");
                    }
                })
            });
        }
    });
})

export default router;