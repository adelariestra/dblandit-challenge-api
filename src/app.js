import express from 'express'
import morgan from 'morgan'

import pkg from '../package.json'

import studentRoutes from './routes/student.routes'

const app = express();

// Config
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);

// Set Up
app.use(morgan('dev'));

// Routes
app.get('/', (req,res)=>{
    res.json({
        name: app.get("pkg").name,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
        author: app.get("pkg").author
    });
})

app.use("/students", studentRoutes);

export default app;