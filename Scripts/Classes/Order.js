const Product = require("./Product");

class Order{
    constructor([customerId, {productList, customer}]){
        this.customerId = customerId;
        this.productList = [];// productList|| []
        this.customer = customer;
    }

    addProduct(name, count){
        if(this.productList.has(name)){
            // Logic to increase product's quantity if the next order was soon made after the previous one
            console.log("Product already exists");
        }
        else{
            this.productList.set(name, this.productList.get(name) + count);
        }
        this.productList.set(name, count);
    }
}

module.exports = Order;