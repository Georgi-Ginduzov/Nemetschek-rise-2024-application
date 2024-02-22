const { promises } = require("dns");
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

    addOrder(customerId, productList, customerCoordinates) {
        this.orders.push([customerId, {productList, customerCoordinates}]);
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
                
                const customerCoordinates = orderDetails[1].customerCoordinates;
                console.log(customerCoordinates);
                
                const deliveryTime = this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
                totalTime += deliveryTime;
                console.log("Delivered to customer");

                console.log("Returning to warehouse");
                totalTime += deliveryTime;
                resolve(totalTime);
            }, 1000);
        });
        
        // To do: reject
    }
    
}

module.exports = Warehouse;