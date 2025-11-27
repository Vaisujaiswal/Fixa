import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    speciality: {type: String, required: true},
    location: {type: String, required: true},
    address: {type: Object, required: true},
    experience: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    available: {type: Boolean, default: true},
    fees: {type: Number, required: true},
    date: {type: Number, required: true},
    slots_booked: {type: Object, default: {}},
}, {minimize: false});

const providerModel = mongoose.models.provider || mongoose.model("provider", providerSchema);

export default providerModel;

