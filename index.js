const inquirer = require('inquirer');
const db = require('./db/index'); 

function mainMenu() {
  inquirer.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
              'View All Departments',
              'View All Roles',
              'View All Employees',
              'Add a Department',
              'Add a Role',
              'Add an Employee',
              'Update an Employee Role',
              'Exit'
          ],
      },
  ]).then((answer) => {
      switch (answer.action) {
          case 'View All Departments':
              db.viewAllDepartments().then(() => mainMenu());
              break;
          case 'View All Roles':
              db.viewAllRoles().then(() => mainMenu());
              break;
          case 'View All Employees':
              db.viewAllEmployees().then(() => mainMenu());
              break;
          case 'Add a Department':
              addDepartment();
              break;
          case 'Add a Role':
              addRole();
              break;
          case 'Add an Employee':
              addEmployee();
              break;
          case 'Update an Employee Role':
              updateEmployeeRole();
              break;
          case 'Exit':
              console.log('Exiting the application.');
              process.exit();
      }
  }).catch((error) => console.error(error));
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?',
        },
    ]).then((answer) => {
        db.addDepartment(answer.name).then(() => mainMenu());
    });
}

function addRole() {
  
    db.getDepartments().then((departments) => {
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the new role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: departmentChoices,
            },
        ]).then((role) => {
            db.addRole(role).then(() => mainMenu());
        });
    });
}

function addEmployee() {
  
    Promise.all([db.getRoles(), db.getEmployees()]).then(([roles, employees]) => {
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        managerChoices.unshift({ name: "None", value: null });

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What's the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What's the employee's last name?",
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What's the employee's role?",
                choices: roleChoices,
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Who's the employee's manager?",
                choices: managerChoices,
            },
        ]).then((employee) => {
            db.addEmployee(employee).then(() => mainMenu());
        });
    });
}

function updateEmployeeRole() {
    
    Promise.all([db.getEmployees(), db.getRoles()]).then(([employees, roles]) => {
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id 
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: "Which employee's role do you want to update?",
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'roleId',
                message: "What's the new role of this employee?",
                choices: roleChoices,
            }
        ]).then(({ employeeId, roleId }) => {
            db.updateEmployeeRole(employeeId, roleId).then(() => mainMenu());
        });
    });
}


mainMenu();