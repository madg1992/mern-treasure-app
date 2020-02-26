const Category = require("../models/category");

// method for creating a new category
// only admins will have the ability to create new product category
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "access denied"
            });
        }
        res.json({ data });
    });
};

// middleware for fetching a single category
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        // if err or category not found then send error msg
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found or does not exist!'
            });
        }
        // otherwise, if the category is found based on the id then
        // populate result in the request object w/ name of category
        req.category = category;
        next();
    });
};

// CRUD : read method.
// once the categoryById middleware is invoke in the route param, then
// read method is used to respond to the product from the 
// req.category (line 28 from categoryById method)
exports.read = (req, res) => {
    return res.json(req.category);
};
