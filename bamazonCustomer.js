var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DBPASS,
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
    readProducts();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Would you like to buy from bamazon?",
            choices: [
                "Yes! I love bamazon products!",
                "Nah, I'm good right now.",
                "exit"
            ]
        }).then(function(answer) {
    
            switch(answer.action) {
                case "Yes! I love bamazon products!":
                    itemIdSearch();
                    break;
            
                  case "Nah, I'm good right now.":
                    console.log("We'll catch up next time, go make some money.");
                    connection.end();
                    break;
            
                  case "exit":
                    connection.end();
                    break;
            }
        });
    }

function readProducts() {
    console.log("All Products at Bamazon:\n");
    connection.query("SELECT item_id, product_name, price FROM products WHERE item_id", function(err, res) {
      if (err) throw err;
      res.forEach(element => {
        console.log("\n-------------------------------------------------\n" + element.item_id + " " + element.product_name + " " + "$" + element.price + "\n-------------------------------------------------\n");
    });
    runSearch();
    });
}

function itemIdSearch() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the item ID of the home product you'd like to buy?",
        }
    ]).then(answer => {
        console.log("\n---------------------------------------------------------");
        item_id = answer.item_id;
        connection.query(
            "SELECT item_id, product_name, price FROM products WHERE ?",
            { item_id : item_id},
            function(err, res) {
                if (err) throw err;
                res.forEach(element => {
                    console.log(element.item_id + " " + element.product_name + " " + "$" + element.price + "\n---------------------------------------------------------\n");
                });
            amountOfItem();
            }
        )
    })
};

var item_id;

function amountOfItem() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "stock_quantity",
            message: "How many units of this product would you like to buy?",
        }
    ]).then(answer => {
        // var stock_quantity = answer.stock_quantity;
        connection.query(
            "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?",
            { item_id : item_id},
            function(err, res) {
                if (err) throw err;
                res.forEach(element => {
                    if (answer.stock_quantity < element.stock_quantity) {
                        connection.query("UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: element.stock_quantity - answer.stock_quantity
                            },
                            {
                                item_id : item_id
                            },
                        ],
                        )
                        console.log("Thank you for your order! Your total is $" + (element.price * answer.stock_quantity));
                    }
                    else {
                        console.log("Insuffient Inventory!, try something else.");
                        readProducts();
                    }
                });
                connection.end();
            }
        )
    })
};


