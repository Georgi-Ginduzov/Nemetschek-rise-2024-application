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

            const customerCoordinates = map.getCustomerCoordinates(id);
            
            const warehouseMedian = this.calculateWarehouseMedian(map);
            map.warehouses[this.chooseWarehouse(customerCoordinates.x, customerCoordinates.y, warehouseMedian)].addOrder(id, productList);
        }

        // To Do - implement product addition logic
        return map;
    }

    calculateDeliveryTime(order){

    }

    absoluteValue(number){
        return number < 0 ? number * -1 : number;
    }

    deliverOrder(warehouse, customerCoordinates){// To Do: finish the implementation of the method
        let time = 0;
        for(let order of warehouse.orders){
            time += 5;//waiting to pack
            console.log("Waiting to pack:");
            console.log(time);

            time += this.absoluteValue(customerCoordinates.x - warehouse.x) + this.absoluteValue(customerCoordinates.y - warehouse.y);
            
            console.log("Delivered to customer");
            console.log(time);

            return time;
        }
    }

    run(){
        const twoDimentionalMap = this.assignValuesFromJson('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/InputExampleForBandA.json');

        let time = 0;
        
        time += this.deliverOrder(twoDimentionalMap.warehouses[0], twoDimentionalMap.getCustomerCoordinates(1));
        for(let order of twoDimentionalMap.warehouses[1].orders){
            time += 5;//waiting to pack
            console.log("Waiting to pack:");
            console.log(time);

            const customerCoordinates = twoDimentionalMap.getCustomerCoordinates(order.customerId);
            time += this.absoluteValue(customerCoordinates.x - twoDimentionalMap.warehouses[1].x) + this.absoluteValue(customerCoordinates.y - twoDimentionalMap.warehouses[1].y);
            console.log("Delivered to customer");
            console.log(time);
        }
        
    }
}
module.exports = SynchronousImplementationEngine;