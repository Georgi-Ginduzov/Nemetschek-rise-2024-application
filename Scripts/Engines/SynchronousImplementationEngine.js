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
        return map;
    }

    calculateTotalDeliveryTime(map, packagingTime){
        Promise.all([
            map.warehouses[0].processOrders(packagingTime),
            map.warehouses[1].processOrders( packagingTime)
        ]).then((warehousesTotalDeliveryTime) => {
            let totalDeliveryTime = 0;
            for(let warehouseDeliveryTime of warehousesTotalDeliveryTime){
                totalDeliveryTime += warehouseDeliveryTime;
            }
            console.log(`Delivered all orders!\nTotal time: ${totalDeliveryTime}`);

            const totalDrones = map.getTotalDrones();
            console.log(`Total drones: ${totalDrones}`)
            
            // To Do - reduce last promise return to warehouse time
            /*let lastPromise = warehousesTotalDeliveryTime[warehousesTotalDeliveryTime.length-1];
            lastDeliveryTime = (lastPromise - packagingTime) / 2;

            totalDeliveryTime -= lastPromise;

            console.log(`Last promise resolved with: ${lastPromise}`);*/
        });
    }

    run(){
        const twoDimentionalMap = this.assignValuesFromJson('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/InputExampleForC.json');//C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/InputExampleForC.json

        const packagingTime = 5;
        //let deliveryTime = this.calculateTotalDeliveryTime(twoDimentionalMap, packagingTime);

        fetch('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/InputExampleForC.json')
            .then((respone) => Response.json())
            .then((json) => console.log(json));
        
    }
}
module.exports = SynchronousImplementationEngine;