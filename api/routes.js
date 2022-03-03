"use strict";
module.exports = function (app) {
    let productsCtrl = require("./controllers/ProductsController");

    // todoList Routes
    app.route("/api/products").get(productsCtrl.get).post(productsCtrl.store);

    app.route("/api/products/:productId")
        .get(productsCtrl.detail)
        .put(productsCtrl.update)
        .delete(productsCtrl.delete);
};
