import dotenv from "dotenv"
dotenv.config();
import express from "express"
const app = express();
import mongoose from "mongoose";

import testJWTRouter from './controllers/test-jwt.js'
import usersRouter from './controllers/users.js'
import profilesRouter from './controllers/profiles.js'

import bcrypt from 'bcrypt'
import cors from 'cors'

let PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors())

app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)


app.get('/', (req, res) => {
    res.json({"message": 'Hello'})
})


app.listen(PORT, () => {
  console.log(`The express app is ready on ${PORT}!`);
});
