const Order = require("./Order");

class Warehouse {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.products = [];
        this.orders = [];
        //this.drone = drone;
    }

    addOrder(orderId, productList) {
        this.orders.push(new Order(orderId, productList));
    }

    getOrder(orderNumber){
        return this.orders[orderNumber];
    }
}

module.exports = Warehouse;