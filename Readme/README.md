# Nemetschek Bulgaria RISE 2024 Homework

## Name
Georgi Ginduzov

## Email
georgi.ginduzov17d@gmail.com

## Description


Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

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

    
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Project status
In progress...