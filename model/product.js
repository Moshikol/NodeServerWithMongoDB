var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    Title: { type: String, required: 'true' },
    Manufacture: { type: String, default: "Microsoft" },
    Model: { type: String, required: 'true' },
    Price: { type: Number, required: 'true' },
    Ram: { type: String, required: 'true' },
    Disksize: { type: String, required: 'true' },
    Disktype: { type: String, required: 'true' },
    Screensize: { type: String, required: 'true' },
    Screenres: { type: String, required: 'true' },
    Cpu: { type: String, required: 'true' },
    Gpu: { type: String, required: 'true' }
});

module.exports = mongoose.model('Product', product); 