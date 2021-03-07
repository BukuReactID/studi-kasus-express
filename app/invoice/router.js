const router = require('express').Router();

const controller = require('./controller');

router.post('/invoices/handle-midtrans', controller.handleMidtransNotification);
router.get('/invoices/:order_id', controller.show);
router.get('/invoices/:order_id/initiate-payment', controller.initiatePayment);

module.exports = router;
