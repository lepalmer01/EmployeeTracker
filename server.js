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

// Function to add a Department

function addDepartment() {
  inquirer
      .prompt ({
          type: "input",
          name: "name",
          message: "What is the name of the new department?"
      }).then((department)=>{
          const query= `INSERT INTO department (name) VALUES (?)`
          db.query(query, department.name, (err, data)=>{
              if(err) throw err;
              console.log(`The ${department.name} was successfully added to the department database!`)
              startApp()
              })
      })
}


// Function to add Role

function addRole() {
  db.query(`SELECT * FROM department`, (err,res)=>{
      if (err) throw(err)
      let departments = res.map((department)=>({
          name: department.name,
          value:department.id
  }))
 
  inquirer
  .prompt([
      {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
      },
      {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
      },
      {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          choices: departments
          
      },
  ]).then((role)=>{
      const query= `INSERT INTO role SET ?`
      db.query(query, 
          {
           title: role.title,
           salary: role.salary,
           department_id:role.department   
          }, (err, res)=>{
              if(err) throw err
              console.log(` The ${role.title} was successfully added to the role database`)
              startApp()
          })
  })

})
}

// Function to add Employee
function addEmployee() {
  db.query(`SELECT * FROM role`, (err,res)=>{
      if (err) throw(err)
      let roles = res.map((role)=>({
          name: role.title,
          value:role.id
  }))
  db.query(`SELECT * FROM employee`, (err,res)=>{
      if (err) throw(err)
      let managers = res.map((manager)=>({
          name: `${manager.first_name} ${manager.last_name}`,
          value:manager.id
  }))
  
      inquirer
      .prompt([
          {
              type: "input",
              name: "firstName",
              message: "Enter the employee's first name:",
          },
          {
              type: "input",
              name: "lastName",
              message: "Enter the employee's last name:",
          },
          {
              type: "list",
              name: "roleId",
              message: "Select the employee role:",
              choices: roles,
          },
          {
              type: "list",
              name: "managerId",
              message: "Select the employee's manager:",
              choices: managers
          },
      ]).then((employee)=>{
          const query= `INSERT INTO employee SET ?`
          db.query(query, 
              {
                  first_name:employee.firstName,
                  last_name:employee.lastName,
                  role_id:employee.roleId,
                  manager_id:employee.managerId
              }, (err, res)=>{
                  if(err) throw err
                  console.log(`${employee.firstName} was successfully added to the employee database`);
                  startApp()
              })
      })
  })
})
      }