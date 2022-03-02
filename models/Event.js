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
    locaion: {
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
        type: Scheme.Types.ObjectId,
        ref: "User",
    }
});

//Export the model
const Event = model("Event", userSchema);

module.exports = Event;