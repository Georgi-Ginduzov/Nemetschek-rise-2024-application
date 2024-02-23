const Order = require("./Order");
const Drone = require("./Drone");

class Warehouse {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.orders = [];
        this.drones = [];
    }

    addOrder(customerId, productList, customer) {
        this.orders.push(new Order([customerId, {customer}], productList));
    }

    addDrone(capacity, consumption) {
        let drone = new Drone(capacity, consumption);
        this.drones.push(drone);
    }

    absoluteValue(number){
        return number < 0 ? number * -1 : number;
    }

    async processOrders(packagingTime) {
        console.log(`Continue delivery process in ${this.name} warehouse`);
        
        this.addDrone(500, 1);
        console.log("Drone added to warehouse. Current drones: ", this.drones.length);

        let totalTime = 0;
        
        for(let orderDetails of this.orders){
            totalTime = await this.deliverOrder(orderDetails, totalTime, packagingTime);
        }

        return totalTime;
    }

    performDelivery(deliveryTime){
        const consumptionForDelivery = deliveryTime * this.drones[0].consumption;

        for(let i = 0; i < this.drones.length; i++){
            if ((this.drones[i].capacity - consumptionForDelivery) >= 0){
                this.drones[i].capacity -= consumptionForDelivery;
                console.log(`Drone ${i} is delivering the order. Current capacity: ${this.drones[i].capacity}`);
                return;
            }
            console.log(`Drone capacity: ${this.drones[i].consumption}`);
        }
        this.addDrone(500 - consumptionForDelivery, 1);
        console.log(`New drone added to ${this.name}. Current drones: ${this.drones.length}`);
    }

    deliverOrder(orderDetails, totalTime, packagingTime) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`Continue delivery process in ${this.name}`);
                
                const customerCoordinates = orderDetails.customer.coordinates;
                const deliveryTime = packagingTime + this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
                
                // find drone to deliver the order

                this.performDelivery(deliveryTime);

                console.log(`Notification to: ${orderDetails.customer.name} --> Order delivered!`);

                totalTime += deliveryTime;

                console.log("Returning to warehouse");
                
                totalTime += deliveryTime - packagingTime;


                resolve(totalTime);
            }, 100);
        });
        
        // To do: reject
    }
    
}

module.exports = Warehouse;