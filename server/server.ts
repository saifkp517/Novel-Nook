import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();

const uri = "mongodb://127.0.0.1:27017";

mongoose.set('strictQuery', false)

mongoose.connect(uri)
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => console.log(err));


const authRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(authRoutes);

app.listen(4000, () => {
  console.log("Connected to port 4000");
});
