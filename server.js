const mysql = require('mysql2');
const inquirer = require('inquirer');
const { log } = require('console');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'employee_db', 
  });