const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');

// route for creating a new product
// only for admins 
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        // Make sures all form fields at completed
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);

        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

// id is coming in from the route paramater
exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            // if err or product not found send error msg
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            // otherwise, if the product is found based on the id then
            // populate result in the request object w/ name of product
            req.product = product;
            next();
        });
};

//CRUD : read method.
// refer to product route for fetching a single product
// when productById method is ran, the product request object will be available for 
// that specific product. the read method will respond the product from the 
// req.product (line 59 from productById method)
exports.read = (req, res) => {
    // sending all the photos together will cause a lot of lag; therefore, we will
    //create a separate request that will load each product's photo
    req.product.photo = undefined;
    return res.json(req.product);
};