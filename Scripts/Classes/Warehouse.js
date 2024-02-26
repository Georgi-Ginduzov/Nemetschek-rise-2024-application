const Order = require("./Order");
const Drone = require("./Drone");

class Warehouse {
    constructor(x, y, name, time) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.time = time;
        this.orders = [];
        this.idleDrones = [];
        this.inDeliveryDrones = [];
        this.typesOfDrones = [];
    }

    addOrder(customerId, productList, customer) {
        this.orders.push(new Order([customerId, {customer}], productList));
    }

    addDroneType(capacity, consumption) {
        this.typesOfDrones.push({capacity, consumption});
    }

    addDrone(capacity, consumption) {
        let drone = new Drone(capacity, consumption, this.x, this.y);
        this.idleDrones.push(drone);
        return drone;
    }

    absoluteValue(number){
        return number < 0 ? number * -1 : number;
    }

    synchronousProcessOrders(packagingTime, droneType) {
        this.idleDrones.length = 0;
        this.addDrone(droneType.capacity, droneType.consumption);

        let totalTime = 0;
        
        for(let orderDetails of this.orders){
            totalTime += this.synchronousOrderDelivery(orderDetails, 0, packagingTime, droneType);
            console.log("Retrurned to warehouse. Current time: ", totalTime);
        }

        return { totalTime: totalTime, totalDrones: this.idleDrones.length };
    }

    synchronousOrderDelivery(orderDetails, totalTime, packagingTime, droneType) {
        const customerCoordinates = orderDetails.customer.coordinates;
        const deliveryTime = packagingTime + this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);
        console.log("Expected delivery time: ", deliveryTime);

        console.log("Beginning delivery...");
        let deliveryDrone = this.droneToPerformMovement(deliveryTime, packagingTime, droneType);
        deliveryDrone.capacity = deliveryDrone.capacity - deliveryTime * droneType.consumption;

        totalTime += deliveryTime;

        console.log(`Notification to: ${orderDetails.customer.name} --> Order delivered! Drone won't wait for the customer to take the order.`);

        console.log("Returning to warehouse");
        
        deliveryDrone.capacity = deliveryDrone.capacity - (deliveryTime - packagingTime) * droneType.consumption;
        totalTime += deliveryTime - packagingTime;

        console.log("Returned to warehouse. Current time: ", totalTime);

        return totalTime;
    }

    async processOrders(packagingTime, droneType) {
        try {
            //console.log(`Begin delivery process in ${this.name}`);


            this.addDrone(droneType.capacity, droneType.consumption);
            //console.log("Drone added to warehouse. Current drones: ", this.idleDrones.length);
            //console.log("Drone added to warehouse. Current drones: ", this.idleDrones.length);

            let totalTime = 0;
            
            for(let orderDetails of this.orders){
                totalTime = await this.deliverOrder(orderDetails, totalTime, packagingTime, droneType);
            }

            return totalTime;
        } catch (err) {
            console.log(err);
        }
    }

    droneToPerformMovement(deliveryTime, packagingTime, droneType){
        const consumptionForDeliveryAndReturning = ((deliveryTime * 2) * droneType.consumption) + packagingTime;

        for(let i = 0; i < this.idleDrones.length; i++){
            if ((this.idleDrones[i].capacity - consumptionForDeliveryAndReturning) >= 0){
                this.idleDrones[i].capacity -= consumptionForDeliveryAndReturning;
                //console.log(`Drone ${i} will be delivering the order. Current capacity: ${this.idleDrones[i].capacity}`);
                
                return this.idleDrones[i];
            }
        }
        //console.log(`New drone added to ${this.name}. Current drones: ${this.idleDrones.length}`);
        return this.addDrone(droneType.maxCapacity, droneType.consumption);
    }

    rechargeIdleDronesForMinute(){
        const rechargingValue = (this.maxCapacity / 20);

        for(let drone of this.idleDrones){
            if (drone.capacity + rechargingValue <= this.maxCapacity) {
                drone.capacity += rechargingValue;
            } else {
                drone.capacity = this.maxCapacity;
            }
        }
    }

    deliverOrder(orderDetails, totalTime, packagingTime, droneType) {
        return new Promise(async (resolve, reject) => {
            try {
                //console.log(`Continue delivery process in ${this.name}`);
                
                const customerCoordinates = orderDetails.customer.coordinates;
                const deliveryTime = packagingTime + this.absoluteValue(customerCoordinates.x - this.x) + this.absoluteValue(customerCoordinates.y - this.y);

                //console.log("Beginning delivery...");
                let deliveryDrone = this.droneToPerformMovement(deliveryTime, packagingTime, droneType);
                this.idleDrones = this.idleDrones.filter(d => d !== deliveryDrone);
                this.inDeliveryDrones.push(deliveryDrone);

                await deliveryDrone.move(customerCoordinates.x, customerCoordinates.y, this.time, this);

                console.log(`Notification to: ${orderDetails.customer.name} --> Order delivered! Drone won't wait for the customer to take the order.`);

                totalTime += deliveryTime;

                //console.log("Returning to warehouse");
                
                await deliveryDrone.move(this.x, this.y, this.time, this);
                
                totalTime += deliveryTime - packagingTime;

                this.inDeliveryDrones = this.inDeliveryDrones.filter(d => d !== deliveryDrone);
                this.idleDrones.push(deliveryDrone);

                resolve(totalTime);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Warehouse;