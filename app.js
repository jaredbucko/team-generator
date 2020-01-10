const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");

function promptUser() {
  return inquirer.prompt([
    {
      type: "question",
      message: "Let's build your team directory! Enter the name of your team manager: ",
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
};

function buildTeam() {

  promptUser()
  .then(function(data) {
    const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    appendFileAsync('./output/team.html', manager);
  }).then(function() {
    appendFileAsync('./output/team.html', 
    `</div>
    </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body>
    </html>`);
  });

};

buildTeam();
