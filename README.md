# Employee Tracker

## Description

The Employee Tracker is a command-line application to manage a company's employee database. It allows users to view and interact with information related to employees, roles, and departments. Built with Node.js, Inquirer, and MySQL, this application provides an easy-to-use interface for organizing and planning your business.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

Before installing, ensure you have Node.js and MySQL installed on your system.

1. Clone the repository to your local machine:
   `git clone https://github.com/DaneLarsen1/employee-tracker.git`
2. Navigate to the project directory:
   `cd employee-tracker`
3. Install the necessary npm packages:
   `npm install`
4. Create an `.env` file in the root of the project to store your MySQL credentials:
DB_HOST=localhost
DB_USER=yourUsername
DB_PASSWORD=yourPassword
DB_DATABASE=employees
Replace `yourUsername` and `yourPassword` with your actual MySQL username and password.

5. Initialize the database and tables by logging into MySQL and sourcing the `schema.sql` and `seeds.sql` files:
`mysql -u yourUsername -p` then once logged in: 
`SOURCE db/schema.sql;`
`SOURCE db/seeds.sql;`

## Usage

To start the application, run:
`node index.js`

Follow the prompts to view, add, or update employees, roles, and departments.

## Features

- View All Departments: Displays a table with department names and department ids.
- View All Roles: Shows job titles, role ids, the departments roles belong to, and the salary for those roles.
- View All Employees: Lists employee data, including ids, first names, last names, job titles, departments, salaries, and managers.
- Add a Department: Allows the user to add a new department to the database.
- Add a Role: Enables adding a new role, including its name, salary, and associated department.
- Add an Employee: Facilitates adding a new employee with their first name, last name, role, and manager.
- Update an Employee Role: Offers the option to update the role for an existing employee.

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your updates. For major changes, please open an issue first to discuss what you would like to change.

## Questions

For any questions or comments, please reach out through GitHub or email.

- GitHub: [DaneLarsen1](https://github.com/DaneLarsen1)
- Email: danelarsen12@gmail.com
