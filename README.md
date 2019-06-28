
# Bamazon
<table>
<tr>
<td>
  I built an Amazon-like storefront with the MySQL skills I learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. This app can also track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
</td>
</tr>
</table>

### Challenge #1: Customer View (Minimum Requirement)
From the screen shot, you can see that the customer is able to choose what they want to buy from Bamazon. The app is able to check if there is enough inventory of a product for the customer to purchase.
![](https://github.com/shihwesley/Bamazon/blob/master/Challenge1.png)

### Challenge #2: Manager View (Next Level)
You can view all the products for sale in a table form with all the related information. As a manager, you can also check for low inventory, and then you can add inventory to any product on Bamazon. The database will be updated right after you make any quieries. 
![](https://github.com/shihwesley/Bamazon/blob/master/Challenge2_1.png)
You can continuously add new products to Bamazon. 
![](https://github.com/shihwesley/Bamazon/blob/master/Challenge2_2.png)

### Challenge #3: Supervisor View (Final Level)
The challenge for part 3 is getting thethe  right query for mysql. We have to combine the products table and the departments table. AS you can see, the query also SUM(product_sale) for products that belong in the same department. As a surpervisor, you are able to create new departments for Bamazon.
With the help of console.table, I was able to console.log mysql query in a table form. It is definitely easier to read that way.

![](https://github.com/shihwesley/Bamazon/blob/master/Challenge3.png)



## Built with 

- [NPM - Inquirer] An easily embeddable and beautiful command line interface for Node.js.
- [NPM - mysql] A node.js driver for mysql.
- [NPM - console.table] An NPM package that can log the table to the console.
