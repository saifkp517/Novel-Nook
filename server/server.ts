import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from "crypto";
import path from "path"

const app = express();

const uri = "mongodb://127.0.0.1:27017";

mongoose.set('strictQuery', false)

// mongoose.connect(uri)
// .then(() => {
//   console.log("Connected to the database!");
// })
// .catch(err => console.log(err));

const conn = mongoose.createConnection(uri)

let gfs: any;
conn.once("open", () => {
  console.log("Connected to the database!")

  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  })
})

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
})

const upload = multer({ storage });

app.post('/upload', upload.single("file"), (req, res) => {
    res.send("uploaded");
})

app.get('/upload/:filename', (req, res) => {
    const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err: any, files: any) => {
      if(!files || files.length === 0) {
        return res.status(404).json({
          err: "No files exist"
        })
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    })
})

const authRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors());

app.use(authRoutes);

app.listen(4000, () => {
  console.log("Connected to port 4000");
});
