// (1) import `router` dan `multer`
const router = require('express').Router();
const multer = require('multer');

// (2) import `cartController`
const cartController = require('./controller');

// (3) route untuk `update` cart
router.put('/carts', multer().none(), cartController.update);
router.get('/carts', cartController.index);


// (4) export router
module.exports = router;
