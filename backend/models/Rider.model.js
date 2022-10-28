import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RiderSchema = new Schema({
  name : {type: String, required: true, minlength: 1},
  pNo : {type: String, required: true, unique: false, trim: true, minlength: 8},
  password : {type: String, required: true, unique: false, trim: true, minlength: 4},
  email : {type: String, unique: true, required: true, minlength: 6},
  license: {type: String, required: true, minlength: 8},

}, {
  timestamps: true,
});

const Rider = mongoose.model('Rider', RiderSchema);

export default Rider;