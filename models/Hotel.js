const Mongoose = require("mongoose")
const {Schema, model} = Mongoose;
const HotelSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        price: {
            type: Number,
        },
        numberOfStars: {
            type: Number,
        },
        description: {
            type: String,
        },
    },

    { timestamps: true })

const Hotel = model("hotel", HotelSchema)
module.exports = Hotel