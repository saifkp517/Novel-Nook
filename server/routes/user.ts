import path from 'path';
import express from 'express';

const router = express.Router();

const Controller = require('../controller/user');

router.get('/user', Controller.getUsers);

router.post('/user', Controller.createUser);

router.get('/test', Controller.test);

module.exports = router;
