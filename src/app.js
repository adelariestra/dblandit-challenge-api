import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import pkg from '../package.json'
import {ORIGIN_ALLOWED} from './config/config.json'

import studentRoutes from './routes/student.routes'
import courseRoutes from './routes/course.routes'
import authRoutes from "./routes/auth.routes";

const app = express();

// Config
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors({origin:ORIGIN_ALLOWED}))
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
app.use("/courses", courseRoutes);

export default app;