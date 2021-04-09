import express from 'express'
import morgan from 'morgan'

const app = express();

//config
app.use(morgan('dev'));

// routes
app.get('/', (req,res)=>{
    res.json('root');
})

export default app;