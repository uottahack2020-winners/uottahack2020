import {Document, model, Model, Schema} from 'mongoose';

export let DriverSchema: Schema = new Schema({
   // driver: mongoose.Model;
   firstName: {
    type: String,
    required: true,
   },
   lastName: String,
   email: {
    type: String,
    required: true,
    unique: true,
   }
   // more properties as we find out
}, {timestamps: true});

DriverSchema.methods.fullName = function(){}