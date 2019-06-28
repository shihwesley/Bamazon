DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(10) NOT NULL,
    department_id INT(10) NOT NULL,
    price INT(10) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    product_sales INT(20) DEFAULT 0
);

CREATE TABLE departments (
    department_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(45) NOT NULL,
    overhead_costs INT(10) NOT NULL
);


INSERT INTO products (product_name, department_name, department_id, price, stock_quantity)
VALUES ("iPhoneX", "Electronic", 1, 1000, 100);

INSERT INTO products (product_name, department_name, department_id, price, stock_quantity)
VALUES ("Macbook Pro", "Electronic", 1, 2000, 100);

INSERT INTO products (product_name, department_name, department_id, price, stock_quantity)
VALUES ("Cast Iron Pan", "Kitchen", 2, 20, 100);

INSERT INTO products (product_name, department_name, department_id, price, stock_quantity)
VALUES ("Yeezy 350 V2", "Shoes", 3, 220, 50);

INSERT INTO products (product_name, department_name, department_id, price, stock_quantity)
VALUES ("Reclining Couch", "Furniture", 4, 500, 100);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Electronic", 100000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Kitchen", 2000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Shoes", 11000);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Furniture", 50000);