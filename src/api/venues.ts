const express = require("express");
const router = express.Router();
import { Venue } from '../models/Venue';

/**
 * Get all venues
 */
router.get('/', (req, res) => {
    const venues = Venue.find();
    console.log(venues);
    res.send(venues);
});

/**
 * Create a Venue
 */
router.post('/create', (req, res) => {

})

export default router;