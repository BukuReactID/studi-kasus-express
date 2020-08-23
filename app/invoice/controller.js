const { subject } = require('@casl/ability');

const Invoice = require('./model');
const { policyFor } = require('../policy');

async function show(req, res, next){


  try{
   
   let { order_id } = req.params;

   let invoice = await Invoice 
     .findOne({order: order_id})
     .populate('order')
     .populate('user');

	 // (1) deklarasikan `policy` untuk `user`
	 let policy = policyFor(req.user);

   // (2) buat `subjectInvoice`
   let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});

   // (3) cek policy `read` menggunakan `subjectInvoice`
   if(!policy.can('read', subjectInvoice)){
     return res.json({
       error: 1, 
       message: `Anda tidak memiliki akses untuk melihat invoice ini.`
     });
   }

   return res.json(invoice);

  } catch(err) {

    return res.json({
      error: 1, 
      message: `Error when getting invoice.`
    });

  }
}

module.exports = {
  show
} 
