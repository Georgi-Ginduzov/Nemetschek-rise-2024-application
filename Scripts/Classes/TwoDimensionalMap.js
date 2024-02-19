const Warehouse = require('./Warehouse.js');
const Customer = require('./Customer.js');

class TwoDimensionalMap{
    constructor(coordinates){
        this.coordinates = coordinates;
        this.warehouses = [];
        this.customers = [];
    }

    addWarehouse(x, y, name){
        this.warehouses.push(new Warehouse(x, y, name));
    }

    addCustomer(id, name, coordinates){
        this.customers.push(new Customer(id, name, coordinates));
    }
}

module.exports = TwoDimensionalMap;