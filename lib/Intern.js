const Employee = require("./Employee");

const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

class Intern extends Employee {

  constructor (name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }

}

module.exports = Intern;
