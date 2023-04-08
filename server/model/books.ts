import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Books = new Schema({
    title: String,
    author: String,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    bookimage: String,
    reviews: [{type: Schema.Types.ObjectId, ref: "Reviews"}],
    pricing: String,
    genre: String,
    rating: Number,
    rentedby: {type: Schema.Types.ObjectId},
    description: String,
    time: Date
    // date: {type: Date},
    // meta: {
    //     upvotes: Number,
    //     downvotes: Number
    // }
})

module.exports = mongoose.model('Books', Books)