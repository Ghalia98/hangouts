const { Schema, model } = require("mongoose");


const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    guestList: {
        type: [String],
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

//Export the model
const Event = model("Event", eventSchema);

module.exports = Event;