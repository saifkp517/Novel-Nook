import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    adminstatus: Boolean,
    userstatus: String,
    email: String,
    password: String,
    address: String,
    phoneno: String,
    joined_date: {
        type: Date,
        default: Date.now
    },
    books: [{type: Schema.Types.ObjectId, ref: "Books"}],
    reviews: [{type: Schema.Types.ObjectId, ref: "Reviews"}]
})


module.exports = mongoose.model('User', User)