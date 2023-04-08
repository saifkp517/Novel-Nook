import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    adminstatus: Boolean,
    userstatus: String,
    email: String,
    balance: String,
    password: String,
    address: String,
    phoneno: String,
    joined_date: {
        type: Date,
        default: Date.now
    },
    booksforrent: [{type: Schema.Types.ObjectId, ref: "Book"}],
    booksowned: [{type: Schema.Types.ObjectId, ref: "Book"}],
    reviews: [{type: Schema.Types.ObjectId, ref: "Reviews"}]
})


module.exports = mongoose.model('User', User)