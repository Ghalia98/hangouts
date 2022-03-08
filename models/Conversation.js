const { Schema, model } = require("mongoose");


const ConversationSchema = new Schema(
    {
        members: {
            type: Array,
        }
    },
    { timestamps: true }

);

//Export the model
const Event = model("Conversation", ConversationSchema);

module.exports = Event;