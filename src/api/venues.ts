const express = require("express");
const router = express.Router();
import { Venue } from '../models/Venue';

/**
 * Get all venues
 */
router.get('/', async (req, res) => {
    try {
        const venues = await Venue.find({});
        console.log(venues);
        res.status(200).send(venues);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

/**
 * Get a specific venue
 */
router.get('/:venueId', async (req, res) => {
    const { venueId } = req.params;

    try {
        const venue = await Venue.findById(venueId);
        console.log(venue);
        res.status(200).send(venue);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error");
    }
})
/**
 * Create a Venue
 */
router.post('/create', (req, res) => {
    const { name, address, hours } = req.body;

    const venue = new Venue({dateCreated: Date.now(), name, address, hours});

    venue.save(err => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).send("Successfully created venue.");
        }
    });
})

export default router;