const Order = require("./Order");
const Drone = require("./Drone");

class Warehouse {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.orders = [];
        this.idleDrones = [];
        this.inDeliveryDrones = [];
    }

    addOrder(customerId, productList, customer) {
        this.orders.push(new Order([customerId, {customer}], productList));
    }

    addDrone(capacity, consumption) {
        let drone = new Drone(capacity, consumption, this.x, this.y);
        this.idleDrones.push(drone);
        console.log("Drone added to idle drones array");
    }

    absoluteValue(number){
        return number < 0 ? number * -1 : number;
    }

    async processOrders(packagingTime) {
        console.log(`Continue delivery process in ${this.name} warehouse`);
        
        this.addDrone(500, 1);
        console.log("Drone added to warehouse. Current drones: ", this.idleDrones.length);

        let totalTime = 0;
        
        for(let orderDetails of this.orders){
            totalTime = await this.deliverOrder(orderDetails, totalTime, packagingTime);
        }

        return totalTime;
    }

    droneToPerformMovement(deliveryTime, packagingTime){
        const consumptionForDelivery = (deliveryTime - packagingTime) * this.idleDrones[0].consumption;

        for(let i = 0; i < this.idleDrones.length; i++){
            if ((this.idleDrones[i].capacity - consumptionForDelivery) >= 0){
                this.idleDrones[i].capacity -= consumptionForDelivery;
                console.log(`Drone ${i} will be delivering the order. Current capacity: ${this.idleDrones[i].capacity}`);
                
                this.inDeliveryDrones.push(this.idleDrones[i]);
                return this.idleDrones[i];
            }
        }
        console.log(`New drone added to ${this.name}. Current drones: ${this.idleDrones.length}`);
        return this.addDrone(500 - consumptionForDelivery, 1);
    }

    rechargeIdleDronesForMinute(time){
        const rechargingValue = (this.maxCapacity / 20) * time;

        for(let drone of this.idleDrones){
            if (drone.capacity + rechargingValue <= this.maxCapacity) {
                drone.capacity += rechargingValue;
            } else {
                drone.capacity = this.maxCapacity;
            }
        }
        return idleDrones;
    }

    deliverOrder(orderDetails, totalTime, packagingTime) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`Continue delivery process in ${this.name}`);
                
                const customerCoordinates = orderDetails.customer.coordinates;
                const deliveryTime = packagingTime + this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
                console.log(`Customer coordinates: ${customerCoordinates.x}, ${customerCoordinates.y}`);

                console.log("Beginning delivery...");
                let deliveryDrone = this.droneToPerformMovement(deliveryTime, packagingTime);
                this.inDeliveryDrones.push(deliveryDrone);

                deliveryDrone.move(customerCoordinates.x, customerCoordinates.y, 1);

                console.log(`Notification to: ${orderDetails.customer.name} --> Order delivered!`);

                this.rechargeIdleDronesForMinute(deliveryTime / 60);

                totalTime += deliveryTime;

                
                
                console.log("Returning to warehouse");
                
                deliveryDrone.move(this.x, this.y, 1);
                
                totalTime += deliveryTime - packagingTime;

                this.inDeliveryDrones.filter(d => d !== deliveryDrone);
                this.idleDrones.push(deliveryDrone);

                resolve(totalTime);
            }, 100);
        });
        
        // To do: reject
    }
    
}

module.exports = Warehouse;