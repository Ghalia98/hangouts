const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    job: {
      type: String,
      required: true
    },
    followers: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    favList: {
      type: [String],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
// try
module.exports = User;
