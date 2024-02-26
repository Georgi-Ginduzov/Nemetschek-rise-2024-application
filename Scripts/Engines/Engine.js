const TwoDimensionalMap = require('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/TwoDimensionalMap.js');

export default class Engine{
    constructor(){
        
    }

    parseInput(address){
        const fs = require('fs');
        let rawData = fs.readFileSync(address);
        let data = JSON.parse(rawData);

        return data;
    }

    async fetchData(path) {
        try {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error:", error);
        }
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

    async assignValuesFromJson(address){

        //const data = await fetchData("your_file.json");
      //console.log(data); // Your JSON data
        const data = await this.fetchData(address)//this.parseInput(address);
        
        const map = new TwoDimensionalMap(data['map-top-right-coordinate'], data['output']);

        for (let warehouse of data['warehouses']) {
            let time = data['output']['minutes']['real'] / data['output']['minutes']['program'];
            console.log("Time: ", time);
            map.addWarehouse(warehouse['x'], warehouse['y'], warehouse['name'], time);
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

        for (let droneData of data['typesOfDrones']) {
            let capacity = droneData['capacity'].slice(0, -1);
            
            if (droneData['capacity'].slice(-2).toLowerCase() === 'kw') {
                capacity = parseInt(droneData['capacity'].slice(0, -2)) * 1000;
            } else {
                capacity = parseInt(droneData['capacity'].slice(0, -1));
            }
            
            const consumption = parseInt(droneData['consumption'].slice(0, -1));
           
            for (let warehouse of map.warehouses) {
                warehouse.addDroneType(capacity, consumption);
            }
        }

        return map;
    }

    averageDeliveryTimeWithoutWarehousesReturn(deliveryTimes, packagingTime){
        let lastReturnToWarehouse = deliveryTimes[deliveryTimes.length-1] - packagingTime;
        let totalDeliveryTime = lastReturnToWarehouse;
        let deliveryTime = 0;

        for(let i = 0; i < deliveryTimes - 1; i++){
            deliveryTime = (deliveryTimes[i] - packagingTime) / 2;
            totalDeliveryTime += deliveryTime;
        }
        
        const averageDeliveryTime = totalDeliveryTime / deliveryTimes.length;

        return averageDeliveryTime;
    }

    async deliverAllOrdersByCertainDroneType(map, packagingTime, droneType){
        console.log(`Delivering all orders with ${droneType.capacity} capacity and ${droneType.consumption} consumption`);

        return Promise.all([
            map.warehouses[0].processOrders(packagingTime, droneType),
            map.warehouses[1].processOrders(packagingTime, droneType)
        ]).then((warehousesTotalDeliveryTime) => {
            let totalDeliveryTime = 0;
            let lastReturnToWarehouse = 
            (warehousesTotalDeliveryTime[warehousesTotalDeliveryTime.length-1] - 5) / 2;
            for(let warehouseDeliveryTime of warehousesTotalDeliveryTime){
                totalDeliveryTime += warehouseDeliveryTime;
            }
            
            totalDeliveryTime -= lastReturnToWarehouse;
            const averageDeliveryTime = totalDeliveryTime / warehousesTotalDeliveryTime.length;
    
            console.log(`Total delivery time: ${totalDeliveryTime}`);
            console.log(`Average delivery time: ${averageDeliveryTime}`);
            console.log("Average delivery time if drone movements to warehouses are not counted: ", this.averageDeliveryTimeWithoutWarehousesReturn(warehousesTotalDeliveryTime, packagingTime));
    
            const totalDrones = map.getTotalDrones();
            console.log(`Total drones performed deliveries: ${totalDrones}`);
            return totalDeliveryTime;
        }).catch(err => {
            console.log(err);
        });
    }

    async run(){
        const twoDimentionalMap = await this.assignValuesFromJson('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/json/Tests/InputExampleForD.json');
        const packagingTime = 5;
        let totalDeliveryTime = [];
        let i = 0;

        console.log("Warehouses: ", twoDimentionalMap.warehouses);
        if(twoDimentionalMap.output.poweredOn === true){
            let i = 0;
            for (let droneType of twoDimentionalMap.warehouses[0].typesOfDrones) {
                totalDeliveryTime[i] = await this.deliverAllOrdersByCertainDroneType(twoDimentionalMap, packagingTime, droneType);
                i++;
            }
        } else {
            for (let droneType of twoDimentionalMap.warehouses[0].typesOfDrones) {
                console.log(`Delivering all orders with drone type: ${droneType.capacity} capacity and ${droneType.consumption} consumption`);
                let totalTime = 0;
                let totalDrones = 0;

                for(let warehouse of twoDimentionalMap.warehouses){
                    let deliveryResult = warehouse.synchronousProcessOrders(packagingTime, droneType);
                    console.log("delivery result", deliveryResult);
                    totalTime += deliveryResult.totalTime;
                    //totalDeliveryTime[i] = deliveryResult.totalTime;
                    totalDrones += deliveryResult.totalDrones;
                }
                console.log(`Total delivery time: ${totalTime}\nTotal drones performed deliveries: ${totalDrones}`);
                i++;
                console.log();
            }
        }
                
    }
}
module.exports = Engine;