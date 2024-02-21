const Order = require("./Order");

class Warehouse {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.products = [];
        this.orders = new Map();
        //this.drone = drone;
    }

    addOrder(customerId, productList, customerCoordinates) {
        this.orders.set(customerId, {productList, customerCoordinates});
    }

    getOrder(orderNumber){
        return this.orders[orderNumber];
    }

    absoluteValue(number){
        return number < 0 ? number * -1 : number;
    }

    async processOrders(){
        for(let [customerId, orderDetails] of this.orders){
            await this.deliverOrder(orderDetails);
        }
    }

    deliverOrder(orderDetails) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let time = 0;
                time += 5; // waiting to pack
                console.log("Waiting to pack:");
                console.log(time);
                
                const customerCoordinates = orderDetails.customerCoordinates;
                console.log(customerCoordinates);
                console.log(`Customer coordinates: ${customerCoordinates.x}, ${customerCoordinates.y}`)
    
                time += this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
                console.log("Delivered to customer");
                console.log(time);
                
                resolve();
            }, 1000);
        });

        // To do: reject
    }
    
}

module.exports = Warehouse;