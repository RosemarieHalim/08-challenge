const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generate-site.js')
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

class Questions {
    constructor() {
      this.employee;
      this.employeeQuestions;
      this.initializeQuestions;
      this.startNewEmployee;
      this.newEmployee;
      this.finishEmployeeList;
    }

    employeeQuestions() {
        inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: "What is the employee's name? (Required)",
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter the name!');
                return false;
              }
            }
          },
          {
            type: 'text',
            name: 'id',
            message: "What is the employee's ID? (Required)",
            validate: idInput => {
              if (idInput) {
                return true;
              } else {
                console.log('Please enter an employee ID!');
                return false;
              }
            }
          },
          {
            type: 'text',
            name: 'email',
            message: "What is the employee's email? (Required)",
            validate: emailInput => {
              if (emailInput) {
                return true;
              } else {
                console.log('Please enter an email!');
                return false;
              }
          }
        })
    }
  
    initializeQuestions() {
        if (!employeeData.cards) {
            inquirer
            .prompt({
              type: 'text',
              name: 'officeNumber',
              message: "What is the Team Manager's office number? (Required)",
              validate: officeInput => {
                if (officeInput) {
                  return true;
                } else {
                  console.log('Please enter an office number!');
                  return false;
                }
              }
            })
            .then(({ name }) => {
              this.employee = new Employee(name);
      
              this.startNewEmployee();
            });
        }
    }
  
    startNewEmployee() {
  
      this.newEmployee();
    }
  
    newEmployee() {
      if (this.addEmployee) {
        inquirer
          .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Add an Employee', 'Finish Building my Team']
          })
  
        inquirer
          .prompt({
            type: 'list',
            message: 'Which employee position would you like to add?',
            name: 'action',
            choices: ['Engineer','Intern']
          })
          .then(({ action }) => {
            if (engineer) {
                inquirer
                .prompt({
                    type: 'text',
                    name: 'github',
                    message: "What is the employee's GitHub? (Required)",
                    validate: linkInput => {
                      if (linkInput) {
                        return true;
                      } else {
                        console.log('Please enter a GitHub!');
                        return false;
                        }
                    }   
                })
            } else if (intern) {
                inquirer
                .prompt({
                    type: 'text',
                    name: 'school',
                    message: "What is the intern's school? (Required)",
                    validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } else {
                        console.log('Please enter a school!');
                        return false;
                        }
                    }   
                })            
                .then(({ name }) => {
                    this.employee = new Employee(name);
            
                    this.startNewEmployee();
                });
            }
          });
        }
    }
  
    finishEmployeeList() {
      if (yeet) {
        //checks if everything is asked and added, creates cards and places them
      } else {
        console.log("Employee profiles have been added!");
      }
    }
  }
  
module.exports = Questions;

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     return generatePage(portfolioData);
//   })
//   .then(pageHTML => {
//     return writeFile(pageHTML);
//   })
//   .then(writeFileResponse => {
//     console.log(writeFileResponse);
//     return copyFile();
//   })
//   .then(copyFileResponse => {
//     console.log(copyFileResponse);
//   })
//   .catch(err => {
//     console.log(err);
//   })