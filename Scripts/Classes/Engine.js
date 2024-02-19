class Engine{
    constructor(){
        
    }

    parseInput(address){
        const fs = require('fs');
        let rawData = fs.readFileSync(address);
        let data = JSON.parse(rawData);

        return data;
    }

    initializeMap(address){
        const data = this.parseInput(address);
        
        const TwoDimensionalMap = require('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/TwoDimensionalMap.js');
        let map = new TwoDimensionalMap(data['map-top-right-coordinate']);

        for (let warehouse of data['warehouses']) {
            map.addWarehouse(warehouse['x'], warehouse['y'], warehouse['name'])
        }

        for (let customer of data['customers']) {
            map.addCustomer(customer['id'], customer['name'], customer['coordinates'])
        }

        /*for (let order of data['orders']) {
            map.addOrder(order['id'])
        }*/

        for (let orderData of data['orders']) {
            let productList = Object.entries(orderData.productList).map(([name, count]) => ({name, count}));
            let order = new Order(orderData.customerId, productList);
            // To Do - Calculation of the correct warehouse for the order
            // Add the order to the appropriate warehouse
          }

        return map;
    }

    start(){
        const twoDimentionalMap = this.initializeMap('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/BandASImlpifiedInputExample.json');

        //console.log(JSON.stringify(twoDimentionalMap, null, 2));
        console.log(twoDimentionalMap);
        // To do - implement other attributes value assignment
        // To do - implement movement logic

        
    }
}

module.exports = Engine;