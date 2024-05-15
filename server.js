// Dependencies 
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const database = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Kilimanjaro1776',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to employeeInfo_db`)
);


const question =
// Prompt for the User
{
  type: 'list',
  name: 'chosenAction',
  message: 'Welcome! What would you like to do?',
  choices: [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update employee role',
    'Quit',
  ],
};


// HERE IS WHERE TO PUT ALL OF YOUR FUNCTIONS, LATER ON YOU CAN PUT THEM IN A SEPARATE FILE TO BE IMPORTED


//Function for viewing all departments
function viewAllDepartments() {
  console.log("Retreiving all departments");

  database.query('SELECT * FROM departments', function (err, results) {
    console.table(results);

    init();
  });
}


//Function for viewing all roles
function viewAllRoles() {
  console.log("Retreiving all roles");

  database.query('SELECT * FROM roles', function (err, results) {
    console.table(results);

    init();
  });
}


//Function for viewing all employees
function viewAllEmployees() {
  console.log("Retreiving all employees");

  database.query('SELECT * FROM employees', function (err, results) {
    console.table(results);

    init();
  });
}


// Function for adding a department to the departments table
function addDepartment() {

  inquirer.prompt({
    type: "input",
    name: "newDepartment",
    message: "Please enter the name of the new department",
  })
    .then((response) => {
      console.log(response.newDepartment);

      database.query(`INSERT INTO departments (department_name) VALUES ("${response.newDepartment}")`);

      console.log("Department Added!");
      init();
    });
}


// Function for adding a role to the roles table
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "Please enter the title of the new role",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Please enter the salary of the new role",
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "Please select the department to which the new role will belong",
      choices: [
        'Executive',
        'Marketing',
        'Sales',
        'Design',
        'Other',
      ]
    },
  ])
    .then((responses) => {
      var newTitle = responses.roleTitle;
      var newSalary = responses.roleSalary;
      var newDepartment = 0;

      if (responses.roleDepartment === 'Executive') {
        newDepartment = 1;
      } 
      else if (responses.roleDepartment === 'Marketing') {
        newDepartment = 2;
      }
      else if (responses.roleDepartment === 'Sales') {
        newDepartment = 3;
      }
      else if (responses.roleDepartment === 'Design') {
        newDepartment = 4;
      }
      else {
        newDepartment = 5;
      }

      
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
      const values = [newTitle, newSalary, newDepartment];

      // Executing the query with parameterized values
      database.query(query, values, function (err, result) {
        if (err) {
          console.error("Error adding new role:", err);
          return;
        }


        console.log("New Role Added");
        init();
      });
    });
}




// Function for adding a 
function addEmployee() {

  inquirer.prompt([
    {
      type: "input",
      name: "employeeFirst",
      message: "Please enter the first name of the new employee",
    },
    {
      type: "input",
      name: "employeeLast",
      message: "Please enter the last name of the new employee",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "Please select the role to which the new employee will be assigned",
      choices: [
        'CEO',
        'CFO',
        'Head of Marketing',
        'Senior Marketing Associate',
        'Junior Marketing Associate',
        'Head of Sales',
        'Senior Sales Associate',
        'Junior Sales Associate',
        'Head of Design',
        'Senior Design Associate',
        'Junior Design Associate',
        'Other',
      ]
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Please select the department to which to which this employee will be assigned",
      choices: [
        'Executive',
        'Marketing',
        'Sales',
        'Design',
        'Other',
      ]
    },

  ])
    .then((responses) => {
      var employeeFirst = responses.employeeFirst;
      var employeeLast = responses.employeeLast;
      var employeeRole = responses.employeeRole;
      var employeeManager= 0;

      if (responses.employeeManager === 'Executive') {
         employeeManager= 1;
      } 
      else if (responses.employeeManager === 'Marketing') {
        employeeManager = 3;
      }
      else if (responses.employeeManager === 'Sales') {
        employeeManager = 6;
      }
      else if (responses.employeeManager === 'Design') {
        employeeManager = 9;
      }
      else {
        employeeManager = 1;
      }
      
      const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const values = [employeeFirst, employeeLast , employeeRole ,employeeManager];

      // Executing the query with parameterized values
      database.query(query, values, function (err, result) {
        if (err) {
          console.error("Error adding new role:", err);
          return;
        }

        
        console.log("New Role Added");
        init();
      });
    });
}




















function updateRole() {

}

function quit() {
  console.log("Until next time!");
  database.end();
  process.exit();
}

function init() {
  // Inquirer prompt to decide which action to perform
  inquirer.prompt(question)

    // With the response from inquirer, log that the function is working
    .then((response) => {

      switch (response.chosenAction) {

        case 'View all departments':
          viewAllDepartments();
          break;

        case 'View all roles':
          viewAllRoles();
          break;

        case 'View all employees':
          viewAllEmployees();
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

        case 'Update employee role':
          updateRole();
          break;

        case 'Quit':
          quit();
          break;

      }
    });
}

// Initializes Application
init();

// Catch
app.use((req, res) => {
  res.status(404).end();
});

// Port listening at localhost3001 or designated process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});