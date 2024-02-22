const Order = require("./Order");


class Warehouse {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.products = [];
        this.orders = [];
        this.drone = [];
    }

    addOrder(customerId, productList, customer) {
        this.orders.push(new Order([customerId, {productList, customer}]));
    }

    getOrder(orderNumber){
        return this.orders[orderNumber];
    }

    absoluteValue(number){
        return number < 0 ? number * -1 : number;
    }

    async processOrders(packagingTime) {
        console.log(`Begin delivering orders`);

        let totalTime = 0;
        
        for(let orderDetails of this.orders){
            totalTime = await this.deliverOrder(orderDetails, totalTime, packagingTime);
            console.log("Returned to warehouse!");
        }

        return totalTime;
    }

    deliverOrder(orderDetails, totalTime, packagingTime) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                totalTime += packagingTime; 

                console.log("Waiting to pack:");
                
                const customerCoordinates = orderDetails.customer.coordinates;
                console.log(customerCoordinates);
                
                const deliveryTime = this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
                totalTime += deliveryTime;
                console.log("Notification to: ", orderDetails.customer.name);
                console.log("Order delivered!");

                console.log("Returning to warehouse");
                
                totalTime += deliveryTime;
                resolve(totalTime);
            }, 100);
        });
        
        // To do: reject
    }
    
}

module.exports = Warehouse;