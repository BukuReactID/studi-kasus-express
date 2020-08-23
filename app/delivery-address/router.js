// (1) import `router` dan `multer`
const router = require('express').Router();
const multer = require('multer');

// (2) import `addressController`
const addressController = require('./controller');


// (3) definisikan _route_ untuk _endpoint_ `create` alamat pengiriman
router.post('/delivery-addresses', multer().none(), addressController.store);
router.put('/delivery-addresses/:id', multer().none(), addressController.update);
router.delete('/delivery-addresses/:id', addressController.destroy);
router.get('/delivery-addresses', addressController.index);


// (4) export `router`
module.exports = router;
