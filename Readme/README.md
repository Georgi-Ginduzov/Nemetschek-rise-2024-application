# Nemetschek Bulgaria RISE 2024 Homework

## Name
Georgi Ginduzov

## Email
georgi.ginduzov17d@gmail.com

## Description
The program starts by assigning values to all of the objects. It then continuous with

Map logic - Imaginary I have split the map by calculating the half of their coordinates sum. Therefore the map is split into two parts considering the warehouse's location. If there are more than two warehouses the calculations would be different. In that way an order is added to a certain warehouse which will provide drone for its delivery. I have chosen this solution due to the fact that it will be chosen the warehouse which is closest to the delivery destination and therefore it will be more productive in general to make deliveries from that warehouse. 
    - a way I can optimize this process is to include a condition in which when a new order is added the ballance between the warehouses' pending orders is checked and if one of them has too much pending orders the other(less engaged warehouse) starts making some of the other's pending deliveries
Using this method there will be needed at least two drones for each warehouse.

Delivery proccess:

Asynchronous delivery process:
The asynchronous delivery process is handled by the processOrders method in the Warehouse class.
    The processOrders method is called with the packaging time and drone type as parameters. It starts by adding a new drone to the warehouse's idle drones. That way by separarting the drones depending on their current task is easier to manage all of their tasks and the less the chance of a drone to do something unneccessery repeatedly thus leading to lighter program execution.
    It then enters a loop over all the orders in the warehouse. For each order, it calls the deliverOrder method, which returns a promise. The await keyword is used to pause execution of the processOrders method until the promise is resolved.
    The deliverOrder method starts by calculating the delivery time based on the customer's coordinates and the warehouse's coordinates. It then calls the droneToPerformMovement method to get a drone to perform the delivery.
    The droneToPerformMovement method checks if any of the idle drones have enough capacity to perform the delivery. If none do, it adds a new drone to the warehouse. That way loss of drones and products is prevented. The chosen drone is then removed from the idle drones and added to the in-delivery drones.
    The deliverOrder method then calls the move method on the drone to move it to the customer's coordinates. This method returns a promise that resolves after a set timeout, simulating the time it takes for the drone to move.
    Once the drone has reached the customer's coordinates, a message is logged to the console to indicate that the order has been delivered. The drone then moves back to the warehouse, and is added back to the idle drones.
    The deliverOrder method then resolves its promise with the total time taken for the delivery. This value is added to the total time in the processOrders method.
    Once all orders have been processed, the processOrders method returns the total time taken for all deliveries.
    This process is asynchronous because it uses promises and the await keyword to handle operations that take time to complete, such as the drone moving to the customer's coordinates. This allows other code to run in the meantime, making the delivery process non-blocking.
    
## Visuals
This visual is an visual interpretation of the hierarchy between my classes and its properties. 
![class-hierarchy](https://drive.google.com/file/d/1pNA91bdSyDrX-MBg2bJvJnX3uYVkPh0f/view?usp=sharing)

Explanation:
I have decided to go for this structure because of several reasons:
    1. TwoDImentionalMap
        * Coordinates - which are given by json input file
        * List of warehouses - because the will be in the map
        List of customers - like warehouses 
    2. Warehouse
        * x - x coordinates given by json input file
        * y - y coordinates given by json input file
        * name - warehouse's name given by json input file
        * Drones - list of drones, because ... To Do
        * Orders - list of orders, it is needed because the products are in the warehouse where they need to be picked and also because of the customer's id which will be needed for the customer's coordinates
    3. Drone 
        * To Do
    4. Order
        * Product id - it is needed to help with identifying a customer's location(it is given by json input file)
        * Products - map of products, because the products are a defined types given by json input file and in that way they will be saved in the orders map if they exist and only their count will be modifiable. That way wrong order product input is prevented(although I have not included any handling of this error) and also all of the benefits of a map are used such as: search of an element, insertion of an element and deletion of an element with low complexity
    5. Product
        * Name - name of a product given by json input file
        * Count - to be modified when initialized and added in an order
    6. Customer (all of it data is given by json input file)
        * Id - to be identifiable by the warehouses drones
        * Name - because of the notification a drone sends if it doesnt wait the customer to takes its order
        * Coordinates - a list of x and y coordinates

    
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Project status
In progress... 
    - Currently implementing adding orders from webpage using websocket server.