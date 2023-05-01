import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const User = require("../model/user");
require("dotenv").config();
const Books = require("../model/books");
const Reviews = require("../model/reviews");
const Notification = require("../model/notifications");
const Order = require("../model/orders");
const CartItem = require("../model/cart");

//////////////////////users////////////////////////////////////

exports.getUsers = async (req: express.Request, res: express.Response) => {
  User.find().then((data: any) => res.send(data));
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

exports.getUserById = async (req: express.Request, res: express.Response) => {
  const id = req.params.userid;

  User.findById({ _id: id })
    .then((data: any) => res.send(data))
    .catch((err: Error) => console.log(err));
};

////////////////////////////books//////////////////////////////////

exports.createBooks = async (req: express.Request, res: express.Response) => {
  const { title, pricing, genre, author, userid, description } = req.body;

  try {
    const book = new Books({
      title: title,
      author: author,
      user: userid,
      genre: genre,
      available: true,
      rentedby: null,
      rating: 0,
      pricing: pricing,
      bookimage: `http://localhost:4000/book/${req.file.filename}`,
      description: description,
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

exports.getBooks = async (req: express.Request, res: express.Response) => {
  Books.find().then((data: any) => res.send(data));
};

exports.PopulateBooks = async (req: express.Request, res: express.Response) => {
  const userid = req.params.userid;

  Books.find({ user: userid }).then((data: any) => res.send(data));
};

exports.getBook = async (req: express.Request, res: express.Response) => {
  Books.findById(req.params.bookid)
    .then((data: any) => res.send(data))
    .catch((err: Error) => console.log(err));
};

/////////////////////////reviews////////////////////////////////////////

exports.createReview = async (req: express.Request, res: express.Response) => {
  const { user, book, rating, comment } = req.body;

  try {
    const review = new Reviews({
      user: user,
      book: book,
      profileimg: "",
      rating: rating,
      comment: comment,
    });
    review
      .save()
      .then((data: any) => {
        res.send("Successfully added a review");
      })
      .catch((err: Error) => console.log("error: " + err));
  } catch (err) {
    res.status(404).send("Fuck off");
  }
};

exports.populateReviewsByBook = async (
  req: express.Request,
  res: express.Response
) => {
  Reviews.find({ book: req.params.bookid }).then((data: any) => {
    res.send(data);
  });
};

////////////////////adminfunctions///////////////////////////////

exports.Promote = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;

  User.updateOne({ _id: id }, { adminstatus: true }).then((data: any) =>
    res.send("successfully Promoted to Admin!")
  );
};

exports.Demote = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;

  User.updateOne({ _id: id }, { adminstatus: false }).then((data: any) =>
    res.send("Demoted to User")
  );
};

///////////////////////////bookrental///////////////////////////////

exports.rentedByUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  const { rentedby, bookid, months } = req.body;

  function AddMonths(date: Date, months: number) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  Books.findOneAndUpdate(
    { _id: bookid },
    { rentedby: rentedby, time: AddMonths(new Date(), months) }
  ).then((data: any) => {
    console.log(data);
    res.send("Successfully rented book");
  });
};

exports.releaseBook = async (req: express.Request, res: express.Response) => {
  const { bookid } = req.body;

  Books.findOneAndUpdate({ _id: bookid }, { rentedby: null, time: null })
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: Error) => console.log(err));
};

////////////////////notification///////////////////////////

exports.createNotification = async (
  req: express.Request,
  res: express.Request
) => {
  const { user, message } = req.body;

  const notification = new Notification({
    user: user,
    message: message,
  });
  notification
    .save()
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: Error) => console.log(err));
};

exports.getNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  const userid = req.params.userid;

  Notification.find({ user: userid })
    .then((data: any) => res.send(data))
    .catch((err: Error) => console.log(err));
};

exports.deleteNotification = async (
  req: express.Request,
  res: express.Response
) => {
  const { notifid } = req.body;

  Notification.findByIdAndDelete(notifid)
    .then((data: any) => {
      console.log(data);
      res.send("Successfully deleted notification");
    })
    .catch((err: Error) => console.log(err));
};

/////////////////////////transactions///////////////////////////

exports.verifySuccess = async (req: express.Request, res: express.Response) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.key_secret);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
      return res.status(400).json({ msg: "Transaction is illicit my dude!" });
    }

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.Orders = async (req: express.Request, res: express.Response) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const amount = parseInt(req.params.value);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order 1232",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("some error has ocurred");

    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

////////////////////////////////orders////////////////////////////////////

exports.createOrder = async (req: express.Request, res: express.Response) => {
  const { customerid, shippingaddress, orderstatus, book } = req.body;

  const order = new Order({
    customerid: customerid,
    shipdate: "",
    shippingaddress: shippingaddress,
    orderstatus: "ConfirmedOrder",
    book: book,
  });

  order
    .save()
    .then((data: any) => res.send(data))
    .catch((err: Error) => console.log(err));
};

exports.getOrderById = async (req: express.Request, res: express.Response) => {
  Order.findById(req.params.orderid)
    .then((data: any) => res.send(data))
    .catch((err: Error) => {
      console.log(err);
      res.send("Invalid Order Id");
    });
};

exports.updateOrder = async (req: express.Request, res: express.Response) => {
  const { orderid, parameter, updatedvalue } = req.body;

  if (parameter === "orderstatus") {
    Order.updateOne({ _id: orderid }, { orderstatus: updatedvalue })
      .then((data: any) => res.send("successfully updated"))
      .catch((err: Error) => console.log(err));
  } else if (parameter === "shippingaddress") {
    Order.updateOne({ _id: orderid }, { shippingaddress: updatedvalue })
      .then((data: any) => res.send("successfully updated"))
      .catch((err: Error) => console.log(err));
  } else if (parameter === "shipdate") {
    Order.updateOne({ _id: orderid }, { parameter: updatedvalue })
      .then((data: any) => res.send("successfully updated"))
      .catch((err: Error) => console.log(err));
  }
};

exports.addToCart = async (req: express.Request, res: express.Response) => {
  const { book, months, booktitle, price, user, bookimg, customer } = req.body;

  const cartItem = new CartItem({
    book: book,
    months: months,
    booktitle: booktitle,
    bookimg: bookimg,
    price: price,
    user: user,
  });

  cartItem
    .save()
    .then((data: any) => {
      console.log(data);
      res.send("Successfully Added Item to Cart");

      Books.findOneAndUpdate({ _id: book }, { rentedby: user }).then(
        (data: any) => {
          console.log(data);
          console.log("Successfully added book");
        }
      );
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

exports.getCartItems = async (req: express.Request, res: express.Response) => {
  CartItem.find({ user: req.params.user })
    .then((data: any) => res.send(data))
    .catch((err: Error) => console.log(err));
};

exports.removeItemFromCart = async (
  req: express.Request,
  res: express.Response
) => {
  const { bookid } = req.body;

  CartItem.findByIdAndDelete(bookid)
    .then((data: any) => {
      console.log(data);
      res.send("Successfully removed item from cart");

      Books.findOneAndUpdate({ _id: bookid }, { rentedby: null }).then(
        (data: any) => {
          console.log(data);
          console.log("Successfully added book");
        }
      );
    })
    .catch((err: Error) => console.log(err));
};

exports.checkItemInCart = async (
  req: express.Request,
  res: express.Response
) => {
  const { bookid } = req.body;

  CartItem.find({
    book: bookid,
    user: req.params.userid,
  })
    .then((data: any) => {
      console.log(bookid, req.params.userid);
      res.send(data);
    })
    .catch((err: Error) => console.log(err));
};

exports.proceedToOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const { userid, shipdate, shippingaddress } = req.body;

  CartItem.find({ user: userid })
    .then((data: any) => {
      const booklist = data.map((book: any) => ({
        title: book.booktile,
        image: book.bookimg,
      }));

      function AddDays(date: Date, day: number) {
        date.setMonth(date.getDay() + day);
        return date;
      }

      const order = new Order({
        customerid: userid,
        shipdate: AddDays(new Date(), 5),
        shippingaddress: shippingaddress,
        orderstatus: "processed",
        books: booklist,
      });

      order
        .save()
        .then((data: any) => {
          CartItem.deleteMany({ user: userid }).then(
            res.send("Successfully placed Order")
          );
        })
        .catch((err: Error) => res.send(err));
    })
    .catch((err: Error) => console.log(err));
};

exports.getOrderItems = async (req: express.Request, res: express.Response) => {
  Order.find({ customerid: req.params.userid })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => console.log(err));
};

exports.getOrders = async (req: express.Request, res: express.Response) => {
  Order.find()
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => console.log(err));
};

exports.updateOrder = async (req: express.Request, res: express.Response) => {
  const { userid, shipdate, orderstatus } = req.body;

  Order.findOneAndUpdate(
    { customerid: userid },
    { shipdate: shipdate, orderstatus: orderstatus }
  ).then((data: any) => {
    console.log(data);
    res.send("Successfully updated order");
  });
};
