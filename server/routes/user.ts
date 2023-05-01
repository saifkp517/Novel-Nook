import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";


const router = express.Router();

const Controller = require("../controller/user");

router.get("/users", Controller.getUsers);

router.post("/user", Controller.createUser);

router.get('/user/:userid', Controller.getUserById);

router.get("/books", Controller.getBooks);

router.post("/login", Controller.LoginUser);

router.get("/bookid/:bookid", Controller.getBook);

router.get('/bookowned/:userid', Controller.PopulateBooks);

router.post('/book', Controller.createBooks)

router.post('/review', Controller.createReview);

router.get('/bookreview/:bookid', Controller.populateReviewsByBook);

router.post('/user/promote', Controller.Promote)

router.post('/user/demote', Controller.Demote)

router.post('/rentedupdate', Controller.rentedByUpdate);

router.post('/release', Controller.releaseBook);

router.post('/notification', Controller.createNotification);

router.get('/notification/:userid', Controller.getNotifications);

router.post('/notifdel', Controller.deleteNotification);

router.post('/orders/:value', Controller.Orders);

router.post('/verify-success', Controller.verifySuccess)

///////////////////orders//////////////////////

router.post('/order', Controller.createOrder);

router.get('/order/:orderid', Controller.getOrderById);

router.post('/updateorder', Controller.updateOrder);

router.post('/addtocart', Controller.addToCart);

router.get('/getcart/:user', Controller.getCartItems);

router.post('/deletecartitem', Controller.removeItemFromCart)

router.post('/checkitem/:userid', Controller.checkItemInCart);

router.post('/delivery', Controller.proceedToOrder);

router.get('/delivery/:userid', Controller.getOrderItems);

router.get('/delivery', Controller.getOrders)

router.post('/tracking', Controller.updateOrder);



module.exports = router;

