
const mongoose = require('mongoose');
import { URI } from './config/keys';

export function connect() {
    console.log("Connecting to MongoDB");
    mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    return mongoose.connection;
}