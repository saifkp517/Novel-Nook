import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";


const router = express.Router();

const Controller = require("../controller/user");

router.get("/users", Controller.getUsers);

router.post("/user", Controller.createUser);

router.post("/book", Controller.createBooks);

router.get("/book", Controller.getBooks);

router.post("/login", Controller.LoginUser);

module.exports = router;
