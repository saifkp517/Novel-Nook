import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import fs from "fs";

const User = require("../model/user");
const Books = require("../model/books");
const Reviews =require("../model/reviews");

exports.getUsers = async (req: Request, res: Response) => {
  User.find().then((data: any) => console.log(data));
};

exports.LoginUser = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((data: any) => {
      if (password == data.password) {
        res.status(200).send(data);
      } else {
        console.log("Incorrect password");
        return res.status(401).json({ message: "Incorrect Password" });
      }
    })
    .catch((err: any) => {
      console.log(err);
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    });
};

exports.createUser = async (req: express.Request, res: express.Response) => {
  const { name, email, password, hobbies, address, phoneno } = req.body;

  try {
    const user = new User({
      name: name,
      adminstatus: false,
      userstatus: "Customer",
      email: email,
      password: password,
      hobbies: hobbies,
      address: address,
      phoneno: phoneno,
    });

    await user
      .save()
      .then((data: any) => {
        console.log(data);
        res.send(data);
      })
      .catch((err: Error) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};


exports.createBooks = async (req: express.Request, res: express.Response) => {

  const { title, author, userid } = req.body;

  try {
    const book = new Books({
      title: title,
      author: author,
      user: userid,
      image: "None",
    });
    book
      .save()
      .then((data: any) => {
        res.send("Successfully added a book!");
      })
      .catch((err: Error) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.createReview =async(req: express.Request, res: express.Response) => {

  const {userid, bookid, rating, comment} = req.body;

  try {

    const review = new Reviews({
      user: userid,
      book: bookid,
      rating: rating,
      comment: comment,
    })
    review.save()
    .then((data: any) => {
      res.send("Successfully added a review");
    })
    .catch((err: Error) => console.log("error: " + err))

  } catch (err) {
    res.status(404).send("Fuck off")
  }

}

exports.getBooks = async (req: Request, res: Response) => {
  Books.find().then((data: any) => console.log(data));
};
