import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Notification = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    message: String,
    sent_date: {type: Date, default: Date.now()},
    link: String
})

module.exports = mongoose.model("Notification", Notification)