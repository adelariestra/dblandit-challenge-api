import mongoose from 'mongoose'
import config from './config/config.json'

console.log(process.env.NODE_ENV);

const db_uri = process.env.NODE_ENV.trim() === 'dev' ? config.DB_DEV_URI : config.DB_TEST_URI; 

mongoose.connect(db_uri, {
    // to avoid deprecated warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log(`DB is connected: ${db_uri}`))
    .catch((err) => console.log(err));