import { Schema, model } from 'mongoose';

export const VenueSchema = new Schema({
  dateCreated: Date,
  name: Date,
  address: String,
  hours: String
});

export const Venue = model('Venue', VenueSchema);