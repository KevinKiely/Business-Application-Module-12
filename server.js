// Dependencies 
const express = require('express');
const mysql = require('mysql2');
const inquirer = require ('inquirer');

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
    database: 'employeeInfo_db'
  },
  console.log(`Connected to the books_db database.`)
);

// Questions to be asked by inquirerer to user
const questions = [

];

inquirer.prompt(questions);


// Catch
app.use((req, res) => {
  res.status(404).end();
});

// Port listening at localhost3001 or designated process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});