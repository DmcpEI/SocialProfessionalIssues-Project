const Mongoose = require("mongoose")
const {Schema, model} = Mongoose;
const FlightSchema = new Schema({
        origin: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        duration: {
            type: Number,
        },
        stops: {
            type: [String],
        },
    },

    { timestamps: true })

const Flight = model("flight", FlightSchema)
module.exports = Flight