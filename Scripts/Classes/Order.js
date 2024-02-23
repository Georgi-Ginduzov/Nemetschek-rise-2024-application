const Product = require("./Product");

class Order{
    constructor([customerId, {customer}], productList){
        this.customerId = customerId;
        this.productList = [];
        this.customer = customer;

        for(let productPair of Object.entries(productList)) {
            const product = new Product(productPair);
            this.productList.push(product);
        }
    }

}
module.exports = Order;