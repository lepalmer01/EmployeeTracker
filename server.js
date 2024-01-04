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

  // Function to start the application
function startApp() {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            db.end();
            console.log("Goodbye!")
            break;
        }
      });
  }

  // Function to view all departments
function viewDepartments(){
    const query= `SELECT * FROM department`
    db.query(query, (err, data)=>{
    if(err) throw err;
    console.table(data)
    startApp()
    })
}

// Function to view all Roles
function viewRoles(){
    const query= `SELECT role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id= department.id`
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.table(data)
        startApp()
        })
}

// Function to view all Employees
function viewEmployees(){
    const query= `SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id= role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id = employee.manager_id`
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.table(data)
        startApp()
        })

}