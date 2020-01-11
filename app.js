const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
// const readFileAsync = util.promisify(fs.readFile);

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const managerArray = [];
const engineerArray = [];
const internArray = [];

function buildTeam() {
  // starts by getting manager info
  return inquirer.prompt([
    {
      type: "question",
      message: "Let's build your team directory! First, enter the name of your team manager: ",
      name: "name"
    },
    {
      type: "question",
      message: "ID: ",
      name: "id",
    },
    {
      type: "question",
      message: "Email: ",
      name: "email",
    },
    {
      type: "question",
      message: "Office number: ",
      name: "officeNumber",
    }
  ])
  .then(function(data) {
    const man = new Manager (
      data.name,
      data.id,
      data.email,
      data.officeNumber,
    );
    managerArray.push(man);
  })
  .then(function() {
    console.log("Now let's enter your engineering team. Enter your first team member below...")
  })
  .then(function() {
    getEngineers()
  });
};

function getEngineers() {
  return inquirer.prompt([
    {
      type: "question",
      message: "Name: ",
      name: "name"
    },
    {
      type: "question",
      message: "ID: ",
      name: "id",
    },
    {
      type: "question",
      message: "Email: ",
      name: "email",
    },
    {
      type: "question",
      message: "GitHub username: ",
      name: "github",
    }
  ])
  .then(function(data) {
    const engineer = new Engineer (
      data.name,
      data.id,
      data.email,
      data.github,
    );
    engineerArray.push(engineer);
  })
  .then(function() {
    inquirer.prompt([
      {
        type: "list",
        message: "Do you want to enter another engineer?",
        choices: ["Yes", "No"],
        name: "continue"
      }
    ]).then(function(data) {
      if (data.continue === "Yes") {
        getEngineers();
      } else {
        //if no more engineers, ask about interns!
        inquirer.prompt([
          {
            type: "list",
            message: "Great! Does your team have any interns?",
            choices: ["Yes", "No"],
            name: "continue"
          }
        ]).then(function(data) {
          if (data.continue === "Yes") {
            getInterns();
          } else {
            return generateHtml();
          };
        });
      };
    });
  });
};

function getInterns() {
  return inquirer.prompt([
    {
      type: "question",
      message: "Name: ",
      name: "name"
    },
    {
      type: "question",
      message: "ID: ",
      name: "id",
    },
    {
      type: "question",
      message: "Email: ",
      name: "email",
    },
    {
      type: "question",
      message: "School: ",
      name: "school",
    }
  ])
  .then(function(data) {
    const intern = new Intern (
      data.name,
      data.id,
      data.email,
      data.school,
    );
    internArray.push(intern);
  })
  .then(function() {
    inquirer.prompt([
      {
        type: "list",
        message: "Do you want to enter another intern?",
        choices: ["Yes", "No"],
        name: "continue"
      }
    ]).then(function(data) {
      if (data.continue === "Yes") {
        getInterns();
      } else {
        return generateHtml();
      };
    });
  });
};

function generateHtml() {

  writeFileAsync('./output/team.html', 
  `<!doctype html>
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
  
      <div class="jumbotron jumbotron-fluid bg-info text-white">
        <div class="container">
          <h1 class="display-4">Our Awesome Dev Team</h1>
          <p class="lead">Thanks for checking out our team directory! Take a look at our stellar roster below...</p>
        </div>
      </div>
  
      <div class="row">
        <div class="col">
          <div class="container">`
    )
    .then(function() {
      appendFileAsync('./output/team.html', 
      `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header"><h2>${managerArray[0].name}</h2></div>
          <div class="card-body">
            <h4 class="card-title">Manager</h4>
            <h5>ID: ${managerArray[0].id}</h5>
            <h5>Email: ${managerArray[0].email}</h5>
            <h5>Office number: ${managerArray[0].officeNumber}</h5>
          </div>
        </div>`)
        .then(function() {
          for(let i = 0; i<engineerArray.length; i++) {
            appendFileAsync('./output/team.html', 
            `<div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
              <div class="card-header"><h2>${engineerArray[i].name}</h2></div>
                <div class="card-body">
                  <h4 class="card-title">Manager</h4>
                  <h5>ID: ${engineerArray[i].id}</h5>
                  <h5>Email: ${engineerArray[i].email}</h5>
                  <h5>Office number: ${engineerArray[i].github}</h5>
                </div>
              </div>`)
              .then(function() {
                appendFileAsync('./output/team.html', 
                `<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
                  <div class="card-header"><h2>${internArray[i].name}</h2></div>
                    <div class="card-body">
                      <h4 class="card-title">Manager</h4>
                      <h5>ID: ${internArray[i].id}</h5>
                      <h5>Email: ${internArray[i].email}</h5>
                      <h5>Office number: ${internArray[i].school}</h5>
                    </div>
                  </div>`
                ).then(function() {
                  console.log("Generated team directory! Check output folder for team.html");
                });
              });
            };
          });
        });
      };

buildTeam();
