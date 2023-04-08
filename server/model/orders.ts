import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Order = new Schema({
    customerid: {type: Schema.Types.ObjectId, ref: "User"},
    orderdate: {type: Date, default: Date.now},
    shipdate: String,
    shippingaddress: String,
    orderstatus: String,
    books: [{type: Schema.Types.ObjectId, ref: "Book"}],
})

module.exports = mongoose.model('Order', Order)