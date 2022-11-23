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
  Rider.find({ email: req.body.Email })
    .then((riders) => {
      res.json(riders);
    })
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
});


Riderrouter.post("/delete", (req, res) => {
  Rider.deleteOne({ email: req.body.Email })
    .then(() => {
      res.json("Rider Deleted");
    })
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
});

Riderrouter.post("/status", async (req, res) => {
  let filter = { email: req.body.Email };
  let update = { status: req.body.status };

  console.log(req.body);

  await Rider.updateOne(filter, update);

  res.json("Status Updated");
});

Riderrouter.post('/accept_appliaction', (req, res) => {
  var required = {
      email: req.body.email
  }
  var temp = req.body
  temp.status=true;
Rider.updateOne(required, temp).then(() => {
      res.json('Application has been accepted')
  }).catch(() => {
      res.json('application cannot be accepted i.e., there wan an error while updating the information')
  })
});

Riderrouter.post('/reject_appliaction', (req, res) => {
  var required = {
      email: req.body.email
  }
  var temp = req.body
  temp.status=false;
Rider.updateOne(required, temp).then(() => {
      res.json('Application has been rejected')
  }).catch(() => {
      res.json('application cannot be rejected i.e., there wan an error while updating the information')
  })
});

Riderrouter.get('/list', (req, res) => {
  Rider.find().then(riders => res.json(riders)).catch(() => {
      res.send('could not be fatched')
  })
})


export default Riderrouter;

// module.exports = router;