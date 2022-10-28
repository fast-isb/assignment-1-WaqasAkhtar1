import express from 'express';
import Rider from '../models/Rider.model.js';
// const express = require('express');
const Riderrouter = express.Router();



Riderrouter.post('/Register', (req, res) => {
  let name = req.body.name;
  let email =req.body.Email;
  let pNo = req.body.pNumber;
  let password = req.body.password;
  let license = req.body.License;

  const newRider = new Rider({
    name,
    email,
    password,
    pNo,
    license,
  });

  newRider
    .save()
    .then(() => {
      res.json("Rider has been added");
    })
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
    console.log(req.body);
})

export default Riderrouter;

// module.exports = router;