const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let arr = [];


const questions = [
    {
        type: "input",
        message: "Employee Name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee Number?",
        name: "id"
    },
    {
        type: "input",
        message: "Employee email?",
        name: "email"
    },
    {
        type: "list",
        message: "Employee Type?",
        choices: ['Manager', 'Intern', 'Engineer'],
        name: "empType"
    },
    {
        type: "input",
        message: "Office Number?",
        name: "office",
        when: (res) => res.empType === 'Manager'
    },
    {
        type: "input",
        message: "GitHub Username?",
        name: "github",
        when: (res) => res.empType === 'Engineer'
    },
    {
        type: "input",
        message: "School Name?",
        name: "school",
        when: (res) => res.empType === 'Intern'
    },
    {
        type: 'confirm',
        message: 'Would you like to add another employee?',
        name: 'add'
    }
];


function init() {
    inquirer
    .prompt(questions)
    .then((res) => {
        arr.push(res);

        if (res.add) {
            init();
        } else {
           createAndRenderObjects(arr);
        }            
    });
}


function createAndRenderObjects(users) {
    let emps = [];
    users.forEach(element => {
        if(element.empType === "Manager") {
            x = new Manager(element.name, element.id, element.email, element.office);
            emps.push(x);
        } else if (element.empType === "Engineer") {
            y = new Engineer(element.name, element.id, element.email, element.github);
            emps.push(y);
        } else {
            z = new Intern(element.name, element.id, element.email, element.school);
            emps.push(z);
        }
        rendered = render(emps);
        fs.writeFile(outputPath, rendered, (err)=>{
            if (err) throw err;
            
        });
        console.log('New employess rendered.');
    });
}

init();