var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
    runSearch();
  
});



function runSearch() {
    readProducts();
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
            
                  case "I'm good for now":
                    console.log("We'll catch up next time, go make some money.");
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
      connection.end();
    });
  }

  function itemIdSearch() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "itemId",
            message: "What is the item ID of the home product you'd like to buy?",
        }
    ]).then(answer => {
        console.log("\n---------------------------------------------------------");
        var product = answer.itemId;
        connection.query(
            "SELECT item_id, product_name, price FROM products WHERE item_id",
            { product : product},
            function(err, res) {
                if (err) throw err;
                res.forEach(element => {
                    console.log(element.item_id + " " + element.product_name + " " + "$" + element.price + "\n---------------------------------------------------------\n");

                });

            }
        )
    })
};

function amountOfItem() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "amount",
            message: "How many units of this product would you like to buy?",
        }
    ]).then(answer => {
        console.log("\n---------------------------------------------------------");
        var product = answer.item_id;
        connection.query(
            "SELECT item_id, product_name, price FROM products WHERE item_id",
            // { song : song},
            function(err, res) {
                if (err) throw err;
                res.forEach(element => {
                    console.log(element.item_id + " " + element.product_name + " " + "$" + element.price + "\n---------------------------------------------------------\n");

                });
                connection.end();
            }
        )
    })
};



// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

