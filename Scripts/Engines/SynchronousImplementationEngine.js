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

    chooseWarehouse(x, y, warehouseMedian){
        return x + y <= warehouseMedian ? 0 : 1;
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
            const customer = map.customers.get(id);
            const customerCoordinates = customer.coordinates;
            
            const warehouseMedian = this.calculateWarehouseMedian(map);

            map.warehouses[this.chooseWarehouse(customerCoordinates.x, customerCoordinates.y, warehouseMedian)].addOrder(id, productList, customer);
        }

        // Add type of drones extraction from the input

        return map;
    }

    deliverAllOrders(map, packagingTime){
        Promise.all([
            map.warehouses[0].processOrders(packagingTime),
            map.warehouses[1].processOrders( packagingTime)
        ]).then((warehousesTotalDeliveryTime) => {
            let totalDeliveryTime = 0;
            for(let warehouseDeliveryTime of warehousesTotalDeliveryTime){
                totalDeliveryTime += warehouseDeliveryTime;
            }
           
            let lastReturnToWarehouse = 
            (warehousesTotalDeliveryTime[warehousesTotalDeliveryTime.length-1] - 5) / 2;
            totalDeliveryTime -= lastReturnToWarehouse;

            console.log(`Total delivery time: ${totalDeliveryTime}`);

            const totalDrones = map.getTotalDrones();
            console.log(`Total drones: ${totalDrones}`);
        });
    }

    run(){
        const twoDimentionalMap = this.assignValuesFromJson('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/InputExampleForBandA.json');

        const packagingTime = 5;
        let totalDeliveryTime = this.deliverAllOrders(twoDimentionalMap, packagingTime);

        
    }
}
module.exports = SynchronousImplementationEngine;