const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const deliveryAddressSchema = Schema({

  nama: {
    type: String, 
    required: [true, 'Nama alamat harus diisi'],
    maxLength: [255, 'Panjang maksimal nama alamat adalah 255 karakter']
  },

  kelurahan: {
    type: String, 
    required: [true, 'Kelurahan harus diisi'], 
    maxlength: [255, 'Panjang maksimal kelurahan adalah 255 karakter'], 
  },

  kecamatan: {
    type: String, 
    required: [true, 'Kecamatan harus diisi'], 
    maxlength: [255, 'Panjang maksimal kecamatan adalah 255']
  }, 

  kabupaten: {
    type: String, 
    required: [true, 'Kabupaten harus diisi'], 
    maxlength: [255, 'Panjang maksimal kabupaten adalah 255 karakter']
  }, 

  provinsi: {
    type: String, 
    required: [true, 'Provinsi harus diisi'], 
    maxlength: [255, 'Panjang maksimal provinsi adalah 255 karakter']
  }, 

  detail: {
    type: String, 
    required: [true, 'Detail alamat harus diisi'], 
    maxlength: [1000, 'Panjang maksimal detail alamat adalah 10000 karakter']
  }, 

  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
}, {timestamps: true});

module.exports = model('DeliveryAddress', deliveryAddressSchema);
