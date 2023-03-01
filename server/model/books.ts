import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Books = new Schema({
    title: String,
    author: String,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    image: {
        data: Buffer,
        contentType: String
    },
    reviews: [{type: Schema.Types.ObjectId, ref: "Reviews"}]
    // date: {type: Date},
    // meta: {
    //     upvotes: Number,
    //     downvotes: Number
    // }
})

module.exports = mongoose.model('Book', Books)