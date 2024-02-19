const Warehouse = require('./Warehouse.js');
class TwoDimensionalMap{
    constructor(coordinates){
        this.coordinates = coordinates;
        this.warehouses = [];
    }

    addWarehouse(x, y, name){
        this.warehouses.push(new Warehouse(x, y, name));
    }

}

module.exports = TwoDimensionalMap;