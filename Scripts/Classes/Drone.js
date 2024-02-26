class Drone {
    constructor(capacity, consumption, warehouseX, warehouseY) {
        this.capacity = capacity;
        this.maxCapacity = capacity;
        this.consumption = consumption;
        this.x = warehouseX;
        this.y = warehouseY;
        this.inDelivery = false;
    }

    async move(x, y, timePerUnitDistance, warehouse){
        if (this.inDelivery) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.move(x, y, timePerUnitDistance, warehouse).then(resolve).catch(reject);
                }, timePerUnitDistance);
            });
        }
    
        try{
            this.inDelivery = true;
    
            while (this.x !== x || this.y !== y) {
                let dx = x > this.x ? 1 : -1;
                let dy = y > this.y ? 1 : -1;
    
                if (this.x !== x) {
                    await this.moveOneStep(dx, 0, timePerUnitDistance, warehouse);
                }
                if (this.y !== y) {
                    await this.moveOneStep(0, dy, timePerUnitDistance, warehouse);
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.inDelivery = false;
        }
    }

    moveOneStep(dx, dy, timePerUnitDistance, warehouse){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.x += dx;
                this.capacity -= this.consumption;
                this.y += dy;
                this.capacity -= this.consumption;

                warehouse.rechargeIdleDronesForMinute();
                resolve();
            }, timePerUnitDistance);
        });
    }
    
}
module.exports = Drone;