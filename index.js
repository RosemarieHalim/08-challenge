const fs = require('fs');
const inquirer = require('inquirer');

const generateHTML = require('./src/generateHTML');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const teamList = [];


const addManager = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: "What is the manager's name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the manager's ID? (Required)",
      validate: nameInput => {
        if  (isNaN(nameInput)) {
            console.log ("Please enter the manager's ID!")
            return false; 
        } else {
            return true;
        }
    }
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the manager's email? (Required)",
      validate: email => {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (valid) {
          return true;
        } else {
          console.log('Please enter an email!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "Please enter the manager's office number",
      validate: nameInput => {
          if  (isNaN(nameInput)) {
              console.log ('Please enter an office number!')
              return false; 
          } else {
              return true;
          }
      }
    }
  ])
  .then(managerInput => {
    const  { name, id, email, officeNumber } = managerInput; 
    const manager = new Manager (name, id, email, officeNumber);

    teamList.push(manager); 
    console.log(manager); 
  })
};
  
const newEmployee = () => {
  console.log(`
    ============================
    Adding employees to the team
    ============================
    `);
  
  return inquirer.prompt ([
    {
      type: 'list',
      name: 'role',
      message: "Please choose your employee's role",
      choices: ['Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: "What's the employee's name?", 
      validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log ("Please enter an employee's name!");
              return false; 
          }
      }
    },
    {
        type: 'input',
        name: 'id',
        message: "Please enter the employee's ID.",
        validate: nameInput => {
            if  (isNaN(nameInput)) {
                console.log ("Please enter the employee's ID!")
                return false; 
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "Please enter the employee's email.",
        validate: email => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                return true;
            } else {
                console.log ('Please enter an email!')
                return false; 
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "Please enter the employee's github username.",
        when: (input) => input.role === "Engineer",
        validate: nameInput => {
            if (nameInput ) {
                return true;
            } else {
                console.log ("Please enter the employee's github username!")
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "Please enter the intern's school",
        when: (input) => input.role === "Intern",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ("Please enter the intern's school!")
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add more team members?',
        default: false
    }
  ])
  .then(employeeData => {
    let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
    let employee; 

    if (role === "Engineer") {
        employee = new Engineer (name, id, email, github);
        console.log(employee);
    } else if (role === "Intern") {
        employee = new Intern (name, id, email, school);
        console.log(employee);
    }
    teamList.push(employee);

    if (confirmAddEmployee) {
        return newEmployee(teamList); 
    } else {
        return teamList;
    }
  })
};

const writeFile = data => {
  fs.writeFile('./dist/index.html', data, err => {
      if (err) {
          console.log(err);
          return;
      } else {
          console.log("Team profile has been created!")
      }
  })
};
  
addManager()
  .then(newEmployee)
  .then(teamList => {
    return generateHTML(teamList);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
  console.log(err);
  });