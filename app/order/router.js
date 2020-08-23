// (1) import `router` dan `multer`
const router = require('express').Router(); 
const multer = require('multer');

// (2) import `orderController`
const orderController = require('./controller');

// (3) _route_ untuk membuat `order`
router.post('/orders', multer().none(), orderController.store);
router.get('/orders', orderController.index);

// (4) export `router`
module.exports = router;
