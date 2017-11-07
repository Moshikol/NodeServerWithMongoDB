var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var productlst = new Schema({
    title: {type:String,required:'true'},
    products: [{ type: ObjectId , ref:'Product',required:'true' }]
});

module.exports = mongoose.model('Productlst', productlst); 