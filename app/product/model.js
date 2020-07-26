const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema({
  
  name: {
    type: String, 
    minlength: [5, 'Panjang nama makanan minimal 5 karakter'],
    required: [true, 'name must be filled']
  },

  description: {
    type: String, 
    maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
  }, 

  price: {
    type: Number, 
    default: 0
  },
  
  image_url: String,

  category: {
    type: Schema.Types.ObjectId, 
    ref: 'Category'
  },

  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]

}, { timestamps: true });


module.exports = model('Product', productSchema);
