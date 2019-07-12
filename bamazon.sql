DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("water repellent kitchen curtains", "kitchen and bath", 52.51, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cotton hand towels", "kitchen and bath", 8.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chrome toilet paper holder", "kitchen and bath", 11.79, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kraken shower curtain", "kitchen and bath", 15.90, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mason jar toothbrush holder", "kitchen and bath", 10.95, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lift top coffee table", "living and dining", 91.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("industrial desk lamp", "living and dining", 49.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vinyl record coasters", "living and dining", 6.99, 192);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("modern glass end table", "living and dining", 59.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("home theatre speaker system", "living and dining", 698.00, 4);
