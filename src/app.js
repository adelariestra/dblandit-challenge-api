import express from 'express'
import morgan from 'morgan'

import pkg from '../package.json'

import studentRoutes from './routes/student.routes'

const app = express();

// Config
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(express.json()); // detect json bodies
app.use(morgan('dev')); // to show req on console

// Routes
app.get('/', (req,res)=>{
    const {name, description, version, author} = app.get("pkg");

    res.json({
        name: name,
        description: description,
        version: version,
        author: author
    });
})

app.use("/students", studentRoutes);

export default app;