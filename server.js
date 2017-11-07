var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Ctitest');
var Product = require('./model/product');
var Productlst = require('./model/productlst');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//gets all the products from the DB
app.get('/product', function (req, res) {
    Product.find({}, function (err, products) { //asc function
        if (err) {
            res.status(500).send({ error: "Cant Show Products" + err });
        }
        else {
            res.send(products);
        }
    });
});
//save a  new product to the DB
app.post('/product/add', function (req, res) {
    var product = new Product(req.body);

    product.save(function (err, savedprod) {
        if (err) {
            res.status(500).send({ error: "Cant Save Product" + err });
        }
        else {
            res.send(savedprod)
        }
    })
});

//gets a list of all the lists in the db
app.get('/productlst', function (req, res) {
    Productlst.find({}).populate({ path: 'products', model: 'Product' }).exec(function (err, Productlst) { //asc function
        if (err) {
            res.status(500).send({ error: "Cant Show Products" + err });
        }
        else {
            res.send(Productlst);
        }
    });
});

//Make a list and save it to the DB
app.post('/productlst/save', function (req, res) {
    var productlst = new Productlst(req.body);

    productlst.save(function (err, savedprodlst) {
        if (err) {
            res.status(500).send({ error: "Cant Save Product" + err });
        }
        else {
            res.send(savedprodlst)
        }
    })
});

//adds a product to the products list and saves it in the DB
app.put('/productlst/add', function (req, res) {
    Product.findOne({ _id: req.body.productid }, function (err, products) { //asc function
        if (err) {
            res.status(500).send({ error: "Cant Show Products" + err });
        }
        else {
            Productlst.update({ _id: req.body.productlstid },
                { $addToSet: { products: req.body.productid } },
                function (err, productlst) {
                    if (err) {
                        res.status(500).send({ error: "Cant Add Product" + err });
                    }
                    else
                        res.send(productlst);
                });
        }
    });
});

// start up the server at the listed port
app.listen(3000, function () {
    console.log('cti is running on port 3000...');

});