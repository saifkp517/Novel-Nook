import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartItem = new Schema({
    book: {type: Schema.Types.ObjectId, ref: "Books"},
    bookimg: String,
    booktitle: String,
    months: Number,
    price: Number,
    user: {type: Schema.Types.ObjectId}
})

module.exports = mongoose.model("CartItem", CartItem);