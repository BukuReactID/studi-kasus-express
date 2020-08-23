const DeliveryAddress = require('./model');
const { policyFor } = require('../policy');
const { subject } = require('@casl/ability');

async function store(req, res, next){
  let policy = policyFor(req.user);
  
  if(!policy.can('create', 'DeliveryAddress')){
    
     return res.json({
       error: 1, 
       message: `You're not allowed to perform this action`
     });
  }

  try{
     let payload = req.body; 
     let user = req.user;

     // (1) buat instance `DeliveryAddress` berdasarkan payload dan data `user` 
     let address = new DeliveryAddress({...payload, user: user._id});

     // (2) simpan ke instance di atas ke MongoDB
     await address.save(); 

     // (3) respon dengan data `address` dari MongoDB
     return res.json(address);

  } catch(err) {
     if(err && err.name === 'ValidationError'){
       return res.json({
         error: 1, 
         message: err.message, 
         fields: err.errors
       });
     }

     next(err);
  }
}

async function update(req, res, next){
  let policy = policyFor(req.user);

  try{
    let { id } = req.params; 
    let { _id, ...payload } = req.body;

    // (1) cek policy
    let address = await DeliveryAddress.findOne({_id: id});

    let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});

    if(!policy.can('update', subjectAddress)){
      return res.json({
         error: 1, 
         message: `You're not allowed to modify this resource`
      });
    }
    // (1) end

		// (1) update ke MongoDB
    address = 
      await DeliveryAddress.findOneAndUpdate({_id: id}, payload, {new: true});

    // (2) respon dengan data `address` 
    return res.json(address);

  } catch(err) {
		if(err && err.name == 'ValidationError'){
      return res.json({
        error: 1, 
        message: err.message,
        fields: err.errors
      });
    }

    next(err);
  }
}

async function destroy(req, res, next){
   let policy = policyFor(req.user);

   try {

     let { id } = req.params;
    
     let address = await DeliveryAddress.findOne({_id: id});

     let subjectAddress = subject({...address, user: address.user});

     if(!policy.can('delete', subjectAddress)){
       return res.json({
          error: 1, 
          message: `You're not allowed to delete this resource`
       });
     }

     await DeliveryAddress
      .findOneAndDelete({_id: id});

     return res.json(address);

   } catch(err) {
   
      // (1) tangani kemungkinan error
      if(err && err.name == 'ValidationError'){
        return res.json({
          error: 1, 
          message: err.message,
          fields: err.errors
        })
      }

      next(err)
   }
}

async function index(req, res, next){
   const policy = policyFor(req.user);

   if(!policy.can('view', 'DeliveryAddress')){
      return res.json({
        error: 1, 
        message: `You're not allowed to perform this action`
      });
   }


   try {
      let { limit = 10, skip = 0 } = req.query;

      const count = await DeliveryAddress.find({user: req.user._id}).countDocuments();

      const deliveryAddresses = 
        await DeliveryAddress
        .find({user: req.user._id})
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort('-createdAt')


      // (1) respon `data` dan `count`, `count` digunakan untuk pagination client
      return res.json({data: deliveryAddresses, count: count});

   } catch (err) {

      if(err && err.name == 'ValidationError'){
        return res.json({
          error: 1, 
          message: err.message,
          fields: err.errors
        })
      }

      next(err)

   }
}


module.exports = {
  store,
  update, 
  destroy,
  index
}
