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
        type: 'list',
        name: 'sales',
        choices: ['View Product Sales by Department', 'Create New Department', 'Exit'],
        message: "What do you want to do?"
      }
    ]).then(function (answer) {
    if (answer.sales === 'View Product Sales by Department') {
      getSalesByDepartment();
    }
    if (answer.sales === 'Create New Department') {
      createNewDepartment();
    }
    if (answer.sales === 'Exit') {
      process.exit();
    }
  })
}

function getSalesByDepartment() {
  connection.query("SELECT d.department_id, d.department_name, d.overhead_costs, SUM(p.product_sales) AS Total_Product_Sales, (SUM(p.product_sales) - d.overhead_costs) AS total_profit FROM departments d INNER JOIN products p ON d.department_id = p.department_id GROUP BY d.department_id", function (err, results) {
    if (err) throw err;
    console.table(['Department_Id', 'Department_Name', 'Overhead_Costs', 'Product_Sales', 'Total_Profit'], results);
    start();
  })
}

function createNewDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What Department would you like to add?"
      },
      {
        name: "overhead",
        type: "input",
        message: "How much overhead for this department?"
      },
    ]).then(function (inquirerResponse) {
    connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: inquirerResponse.department,
        overhead_costs: inquirerResponse.overhead,
      });
    console.log(inquirerResponse.department + " has been added to the Data Base");
    start()
  })
}
