import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Review = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    book: {type: Schema.Types.ObjectId, ref: "Book"},
    rating: Number,
    comment: String,
    review_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Reviews', Review);