var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin11:admin11@cluster0.fkbu7.mongodb.net/test');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var citySchema  = {
    "_id" : Number,
    "city" : String,
    "loc": [String],
    "pop": Number,
    "state": String,
};
// create model if not exists.
module.exports = mongoose.model('City',citySchema);