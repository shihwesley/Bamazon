// Load the NPM Package inquirer
var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "199637wS",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function (err, results) {
    //console.log(results);
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            var productArray = [];
            for (var i = 0; i < results.length; i++) {
              productArray.push(results[i].product_name);
            }
            productArray.push('Exit');
            return productArray;
          },
          message: "These are the products that are available on Bamazon"
        }
      ]).then(function (answer) {
      if (answer.choice === 'Exit') {
        process.exit();
      } else {
        inquirer.prompt([
          {
            name: "stocknumber",
            type: "input",
            message: "How many would you like to buy?"
          }
        ]).then(function (inquirerREsponse) {
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
              if (results[i].stock_quantity < inquirerREsponse.stocknumber) {
                console.log("Insufficient quantity! Please Come back another time!");
              } else {
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: (results[i].stock_quantity - inquirerREsponse.stocknumber),
                      product_sales: (results[i].price * inquirerREsponse.stocknumber + results[i].product_sales)
                    },
                    {
                      product_name: answer.choice
                    }
                  ]
                );
                console.log("Your total is " + (results[i].price * inquirerREsponse.stocknumber));
                start();
              }
            }
          }
        })

      }

    })
  })
}
