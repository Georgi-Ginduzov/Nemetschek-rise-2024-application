const Warehouse = require('./Warehouse.js');
const Customer = require('./Customer.js');

class TwoDimensionalMap{
    constructor(coordinates, output){
        this.coordinates = coordinates;
        this.output = output;
        this.warehouses = [];
        this.customers = new Map();
    }

    addWarehouse(x, y, name, time){
        this.warehouses.push(new Warehouse(x, y, name, time));
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
            totalDrones += warehouse.idleDrones.length + warehouse.inDeliveryDrones.length;
        }
        return totalDrones;
    }
}

module.exports = TwoDimensionalMap;