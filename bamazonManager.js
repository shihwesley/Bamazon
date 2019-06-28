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
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
        message: "What would you like to see?"
      }
    ]).then(function (answer) {
    if (answer.choice === 'View Products for Sale') {
      productList();
    }
    if (answer.choice === 'View Low Inventory') {
      lowInventory();
    }
    if (answer.choice === 'Add to Inventory') {
      addInventory();
    }
    if (answer.choice === 'Add New Product') {
      addNewInventory();
    }
    if (answer.choice === 'Exit') {
      process.exit();
    }
  })
}

function productList() {
  connection.query("SELECT * FROM products", function (err, results) {
    //console.log(results);
    if (err) throw err;
    console.table(['ID', 'Product', 'Department', 'Department ID', 'Price', 'Stock Quantity', 'Stock Quantity', 'Product Sales'], results);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Do you want to go back to main menu?",
          choices: ['Yes', 'No'],
          name: "menu"
        }
      ]).then(function (answer) {
      if (answer.menu === "Yes") {
        start();
      } else {
        start();
      }
    })

  })
}

function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
    //console.log(results);
    if (err) throw err;
    console.log('\n');
    console.log("These products are low on inventory!");
    console.table(['ID', 'Product', 'Department', 'Department ID', 'Price', 'Stock Quantity', 'Stock Quantity', 'Product Sales'], results);
    // for (var i = 0; i < results.length; i++) {
    //   console.log("ID: " + results[i].item_id);
    //   console.log("Product: " + results[i].product_name);
    //   console.log("Department: " + results[i].department_name);
    //   console.log("Price: " + results[i].price);
    //   console.log("Stock Quantity: " + results[i].stock_quantity);
    //   console.log("\n");
    // }
    inquirer
      .prompt([
        {
          type: "list",
          message: "Do you want to add more inventory?",
          choices: ['Yes', 'No'],
          name: "inventory"
        }
      ]).then(function (answer) {
      if (answer.inventory === "Yes") {
        addInventory();
      } else {
        start();
      }
    })
  })
}

function addInventory() {
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
            return productArray;
          },
          message: "Which Product do you want to add more inventory?"
        },
        {
          name: "amount",
          type: "input",
          message: "How many Inventory would you like to add?"
        }

      ]).then(function (answer) {
      for (var i = 0; i < results.length; i++) {
        var a = parseInt(results[i].stock_quantity) + parseInt(answer.amount);
        if (results[i].product_name === answer.choice) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: a
              },
              {
                product_name: answer.choice
              }
            ]);
          console.log("We added " + answer.amount + " " + answer.choice);
          start();
        }

      }
    })
  })
}


function addNewInventory() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What would you like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department does it belong to?"
      },
      {
        name: "departmentNumber",
        type: "input",
        message: "What is the Department ID?"
      },
      {
        name: "price",
        type: "input",
        message: "How much do you want to sell it for?"
      },
      {
        name: "stocknumber",
        type: "input",
        message: "How many of it do we have?"
      }
    ]).then(function (inquirerResponse) {
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: inquirerResponse.product,
        department_name: inquirerResponse.department,
        department_id: inquirerResponse.departmentNumber,
        price: inquirerResponse.price,
        stock_quantity: inquirerResponse.stocknumber
      });
    console.log(inquirerResponse.product + " has been added to the Data Base");
    inquirer
      .prompt([
        {
          type: "list",
          message: "Do you want to add more New inventory?",
          choices: ['Yes', 'No'],
          name: "newinventory"
        }
      ]).then(function (answer) {
      if (answer.newinventory === 'Yes') {
        addNewInventory()
      } else {
        start();
      }

    })

  })

}

