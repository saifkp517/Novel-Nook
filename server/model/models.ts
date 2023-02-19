import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    password: String,
    hobbies: String,
    // books: [{body: String}],
})

const Books = new Schema({
    title: String,
    author: String,
    date: {type: Date},
    meta: {
        upvotes: Number,
        downvotes: Number
    }
})

// const userSchema = mongoose.model('User', User);
// const bookSchema = mongoose.model('Books', Books);

// module.exports = {userSchema, bookSchema};

module.exports = mongoose.model('User', User)