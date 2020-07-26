const Category = require('./model');

async function store(req, res, next){

   try{

     let payload = req.body; 

     let category = new Category(payload);

     await category.save(); 
    
     return res.json(category);
   } catch(err){

     // (1) tangani error yang disebabkan oleh validasi model
     if(err && err.name === 'ValidationError'){
        return res.json({
           error: 1, 
           message: err.message, 
           fields: err.errors
        });
     }

     // (2) tangani error yang tidak kita ketahui
     next(err);
   }
}

async function update(req, res, next){

   try{

     let payload = req.body; 

     let category = 
       await Category.findOneAndUpdate({_id: req.params.id}, payload, {new: true, runValidators: true});
    
     return res.json(category);
   } catch(err){

     // (1) tangani error yang disebabkan oleh validasi model
     if(err && err.name === 'ValidationError'){
        return res.json({
           error: 1, 
           message: err.message, 
           fields: err.errors
        });
     }

     // (2) tangani error yang tidak kita ketahui
     next(err);
   }
}

async function destroy(req, res, next){
  try{
    
    // (1) cari dan hapus categori di MongoDB berdasarkan field _id
    let deleted = await Category.findOneAndDelete({_id: req.params.id});

    // (2) respon ke client dengan data category yang baru saja dihapus
    return res.json(deleted);
  } catch(err){

    // (3) handle kemungkinan error
    next(err);
  }
}

module.exports = {
  store,
  update,
  destroy
}
