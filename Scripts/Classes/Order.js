const Product = require("./Products");

class Order{
    constructor(customerId, productList){
        this.customerId = customerId;
        this.productList = productList.map(product => new Product(product.name, product.count));
    }

    addOrder
}

module.exports = Order;