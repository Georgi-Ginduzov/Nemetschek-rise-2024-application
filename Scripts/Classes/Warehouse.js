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

        let timeCounter = 0;
        
        for(let orderDetails of this.orders){
            timeCounter = await this.deliverOrder(orderDetails, timeCounter, packagingTime);
            console.log("Returned to warehouse!");
            console.log(timeCounter);
        }
        return await timeCounter;
    }

    deliverOrder(orderDetails, timeCounter, packagingTime) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                timeCounter += packagingTime; 

                console.log("Packing...");
                
                const customerCoordinates = orderDetails[1].customerCoordinates;
                console.log(customerCoordinates);
                
                const deliveryTime = this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
                timeCounter += deliveryTime;
                console.log("Delivered to customer");

                console.log("Returning to warehouse");
                timeCounter += deliveryTime;
                resolve(timeCounter);
            }, 1000);
        });
        
        // To do: reject
    }
    
}

module.exports = Warehouse;