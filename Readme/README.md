# Nemetschek Bulgaria RISE 2024 Homework

## Name
Georgi Ginduzov

## Email
georgi.ginduzov17d@gmail.com

## Description
Imaginary I have split the map by calculating the half of their coordinates sum. Therefore the map is split into two parts considering the warehouse's location. If there are more that two warehouses the calculations would be different. In that way before an order is added it is added to a certain warehouse which will provide drone for its delivery. I have chosen this solution due to the fact that it will be chosen the warehouse which is closest to the delivery destination and therefore it will be more productive in general to make deliveries from that warehouse. 
    - a way I can optimize this process is to include a condition in which when a new order is added the ballance between the warehouses' pending orders is checked and if one of them has too much pending orders the other(less engaged warehouse) starts making some of the other's pending deliveries
Using this method there will be needed at least two droes for each warehouse.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

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