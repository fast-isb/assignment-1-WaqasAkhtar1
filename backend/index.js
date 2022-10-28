/**
 * This is a basic starting point of the assignment
 * Modify the code according to your own needs and requirements
 */

//const express = require('express')
import express from 'express'; // <-- Module Style import
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from "mongoose";
import {} from "dotenv/config";


// Importing user route
import Riderrouter from './routes/Rider.js';
// const router = require('router')

// const bodyParser = require('body-parser')

const app = express()
const port = 3001
app.use(cors());
app.use(bodyParser.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Adding a Router
app.use('/Rider', Riderrouter);

app.get('/', (req, res) => {
    res.send('Hello Universe!')
})

app.get('/todos', (req, res) => {
    res.send('A list of todo items will be returned')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Posting a Request')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})