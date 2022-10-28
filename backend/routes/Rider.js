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
  let status= false;
  const newRider = new Rider({
    name,
    email,
    password,
    pNo,
    license,
    status,
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

Riderrouter.post("/login", (req, res) => {
  let email = req.body.Email;
  let password = req.body.password;
 
  Rider.find({ email: req.body.email, password: req.body.password })
    .then((riders) => {
      res.json(riders);
    
    })
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
});

Riderrouter.post("/getRider", (req, res) => {
  Rider.find({ email: req.body.email })
    .then((riders) => {
      res.json(riders);
    })
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
});


Riderrouter.post("/delete", (req, res) => {
  Rider.deleteOne({ email: req.body.email })
    .then(() => {
      res.json("Rider Deleted");
    })
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
});

Riderrouter.post("/status", async (req, res) => {
  let filter = { email: req.body.email };
  let update = { status: req.body.status };

  console.log(req.body);

  await Rider.updateOne(filter, update);

  res.json("Status Updated");
});


export default Riderrouter;

// module.exports = router;