const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;


mongoose.connect(MONGO_URL, {
    dbname: DB_NAME
}).then(
    () => {
        console.log('conntected to database');

    }
).catch((err) => {
    console.log('conntection error '+err);
})

