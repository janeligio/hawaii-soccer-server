import { Schema, model } from 'mongoose';

const GameSchema = new Schema({
  dateCreated: { type: Date, default: Date.now() },
  name: String,
  venue: Schema.Types.ObjectId,
  date: Date,
  startTime: String,
  endTime: String,
  playerCount: { type: Number, default: 1},
  notes: String
});

export const Game = model('Game', GameSchema);