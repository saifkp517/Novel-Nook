import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Review = new Schema({
    user: String,
    book: {type: Schema.Types.ObjectId, ref: "Book"},
    profileimg: String,
    rating: Number,
    comment: String,
    review_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Reviews', Review);