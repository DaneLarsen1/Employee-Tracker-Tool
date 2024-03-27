const mysql = require('mysql2/promise');
const config = require('./config'); 

const pool = mysql.createPool(config);

async function viewAllDepartments() {
    const [departments] = await pool.query('SELECT * FROM department');
    console.table(departments);
}

async function getDepartments() {
    const [departments] = await pool.query('SELECT id, name FROM department');
    return departments;
}

async function viewAllRoles() {
    const [roles] = await pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');
    console.table(roles);
}

async function getRoles() {
    const [roles] = await pool.query('SELECT id, title FROM role');
    return roles;
}

async function viewAllEmployees() {
    const [employees] = await pool.query(
        'SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, " ", m.last_name) AS manager ' +
        'FROM employee e ' +
        'LEFT JOIN employee m ON e.manager_id = m.id ' +
        'INNER JOIN role ON e.role_id = role.id ' +
        'INNER JOIN department ON role.department_id = department.id'
    );
    console.table(employees);
}

async function getEmployees() {
    const [employees] = await pool.query('SELECT id, first_name, last_name FROM employee');
    return employees;
}

async function addDepartment(name) {
    await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
}

async function addRole({ title, salary, department_id }) {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
}

async function addEmployee({ first_name, last_name, role_id, manager_id }) {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
}

async function updateEmployeeRole(employeeId, roleId) {
    await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

module.exports = {
    viewAllDepartments,
    getDepartments,
    viewAllRoles,
    getRoles,
    viewAllEmployees,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
