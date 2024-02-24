class Drone {
    constructor(capacity, consumption, warehouseX, warehouseY) {
        this.capacity = capacity;
        this.maxCapacity = capacity;
        this.consumption = consumption;
        this.x = warehouseX;
        this.y = warehouseY;
        this.inDelivery = false;
    }

    rechargeIdleDrone(drone, time){
        const rechargingValue = (this.capacity / 20) * time;

        if (drone.capacity + rechargingValue <= this.maxCapacity) {
            drone.capacity += rechargingValue;
        } else {
            drone.capacity = this.maxCapacity;
        }
        return drone;
    }

    async move(x, y, timePerUnitDistance){
        console.log(`Drone is beginning delivery to ${x}, ${y}`);
        console.log(`Drone is at x: ${this.x} and y: ${this.y}`);
        this.inDelivery = true;
        let dx = x > this.x ? 1 : -1;
        let dy = y > this.y ? 1 : -1;

        while (this.x !== x || this.y !== y) {
            if (this.x !== x) {
                await this.moveOneStep(dx, 0, timePerUnitDistance);
            }
            if (this.y !== y) {
                await this.moveOneStep(0, dy, timePerUnitDistance);
            }
        }
    }

    moveOneStep(dx, dy, timePerUnitDistance){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.x += dx;
                this.y += dy;
                
                resolve();
            }, timePerUnitDistance);
        });
    }
    
}
module.exports = Drone;