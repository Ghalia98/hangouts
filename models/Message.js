const { Schema, model } = require("mongoose");


const MessageSchema = new Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String
        }
    },
    { timestamps: true }

);

//Export the model
const Event = model("Message", MessageSchema);

module.exports = Event;