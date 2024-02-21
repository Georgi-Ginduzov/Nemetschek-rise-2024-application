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
        this.customers.set(id, {name, coordinates});
    }

    getCustomerCoordinates(id){
        return this.customers.get(id).coordinates;
    }
}

module.exports = TwoDimensionalMap;