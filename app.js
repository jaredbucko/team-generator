const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

async function promptUser() {

  const res = await inquirer.prompt([
    {
      type: "question",
      message: "Let's start building your team! What is the name of your manager?",
      name: "name"
    },
    {
      type: "question",
      message: "ID:",
      name: "id",
    },
    {
      type: "question:",
      message: "Email:",
      name: "email",
    },
    {
      type: "question",
      message: "Office number:",
      name: "officeNumber",
    }
  ]);

  const name = res.name;
  const id = res.id;
  const email = res.email;
  const officeNumber = res.officeNumber;

  writeFileAsync('index.html', `<!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
        <title>Hello, world!</title>
      </head>
      <body>
    
        <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
          <div class="card-header"><h2>${name}</h2></div>
          <div class="card-body">
            <h4 class="card-title">Manager</h4>
            <h5>ID: ${id}</h5>
            <h5>Email: ${email}</h5>
            <h5>Office number: ${officeNumber}</h5>
          </div>
        </div>
    
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </body>
    </html>`);

};

promptUser();
