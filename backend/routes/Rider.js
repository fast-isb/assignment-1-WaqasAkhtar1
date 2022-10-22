import express from 'express';
// const express = require('express');
const router = express.Router();

const Rider = [
    {
        name: 'John Doe',
        age: 25
    }
]

router.get('/', (req, res) => {
    console.log("chl rha hy"); 
    res.send(Rider)
})

router.post('/signup', (req, res) => {
    const Rider = req.body;
    console.log(req.body);
    res.send(`added into the DB`)
})

export default router;

// module.exports = router;