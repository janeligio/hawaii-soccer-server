import { Schema, model } from 'mongoose';

export const VenueSchema = new Schema({
    dateCreated: { type: Date, default: Date.now() },
    name: String,
    address: String,
    hours: String,
});

export const Venue = model('Venue', VenueSchema);
