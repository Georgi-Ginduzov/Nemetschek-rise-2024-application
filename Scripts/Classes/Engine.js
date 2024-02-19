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
        return map;
    }

    start(){
        const twoDImentionalMap = this.initializeMap('C:/Users/Asus/source/GitLab repos/georgi-ginduzov-nemetschek-rise-2024/Scripts/Classes/Tests/BandASImlpifiedInputExample.json');

        console.log(twoDImentionalMap);
        // To do - implement other attributes value assignment
        // To do - implement movement logic

        
    }
}

module.exports = Engine;