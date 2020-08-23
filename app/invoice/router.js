const router = require('express').Router();

const controller = require('./controller');

router.get('/invoices/:order_id', controller.show);

module.exports = router;
