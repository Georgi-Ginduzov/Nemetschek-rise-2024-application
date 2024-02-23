const Warehouse = require('./Warehouse.js');
const Customer = require('./Customer.js');

class TwoDimensionalMap{
    constructor(coordinates){
        this.coordinates = coordinates;
        this.warehouses = [];
        this.customers = new Map();
    }

    addWarehouse(x, y, name){
        this.warehouses.push(new Warehouse(x, y, name));
    }
    
    addCustomer(id, name, coordinates){
        const customer = new Customer(id, name, coordinates);
        this.customers.set(id, customer);
    }

    getCustomerNameAndCoordinates(id){
        return this.customers.get(id);
    }

    getTotalDrones(){
        let totalDrones = 0;
        for(let warehouse of this.warehouses){
            totalDrones += warehouse.drones.length;
        }
        return totalDrones;
    }
}

module.exports = TwoDimensionalMap;