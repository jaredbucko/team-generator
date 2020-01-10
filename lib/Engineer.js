const Employee = require("./Employee");

const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

class Engineer extends Employee {

  constructor (name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }

}

module.exports = Engineer;
