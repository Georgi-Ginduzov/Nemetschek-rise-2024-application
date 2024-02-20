class SynchronousImplementationEngine{
    constructor(){
        
    }

    parseInput(address){
        const fs = require('fs');
        let rawData = fs.readFileSync(address);
        let data = JSON.parse(rawData);

        return data;
    }

    calculateWarehouseMedian(map){
        const firstWarehouseCoordinatesSum = map.warehouses[0].x + map.warehouses[0].y;
        const secondWarehouseCoordinatesSum = map.warehouses[1].x + map.warehouses[1].y;
        const warehouseMedian = (firstWarehouseCoordinatesSum + secondWarehouseCoordinatesSum) / 2;

        return warehouseMedian;
    }

    chooseWarehouse(map, customerCoordinates){
        const customerCoordinatesSum = customerCoordinates[0] + customerCoordinates[1];

        const warehouseMedian = this.calculateWarehouseMedian(map);

        return customerCoordinatesSum <= warehouseMedian ? 0 : 1;
    }

    assignValuesFromJson(address){
        const data = this.parseInput(address);
        
        const TwoDimensionalMap = require('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/TwoDimensionalMap.js');
        let map = new TwoDimensionalMap(data['map-top-right-coordinate']);

        for (let warehouse of data['warehouses']) {
            map.addWarehouse(warehouse['x'], warehouse['y'], warehouse['name']);
        }

        for (let customer of data['customers']) {
            map.addCustomer(customer['id'], customer['name'], customer['coordinates']);
        }

        for (let orderData of data['orders']) {            
            let id = orderData['customerId']
            let productList = orderData['productList'];
            const customerCoordinates = map.getCustomerCoordinates(id);
            map.warehouses[this.chooseWarehouse(map, customerCoordinates)].addOrder(id, productList);
        }

        // To Do - implement product addition logic
        /*for(let product of data['products']){
            map.warehouses[0].addProduct(product['name'], product['count']);
            map.warehouses[1].addProduct(product['name'], product['count']);
        }*/

        return map;
    }

    run(){
        const twoDimentionalMap = this.assignValuesFromJson('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/InputExampleForBandA.json');

        console.log(twoDimentionalMap);
        // To do - implement movement logic

        
        
    }
}
module.exports = SynchronousImplementationEngine;