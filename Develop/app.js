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

console.log(outputPath);
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
]
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function init() {
    inquirer
    .prompt(questions)
    .then((res) => {
        arr.push(res);
        console.log(arr);
        console.log('^^^ arr after push ^^^')
        if (res.add) {
            init()
        } else {
           createAndRenderObjects(arr);
        }            
    })
    .then()
}


function createAndRenderObjects(users) {
    let emps = [];
    users.forEach(element => {
        if(element.empType === "Manager") {
            x = new Manager(element.name, element.id, element.email, element.office)
            emps.push(x);
        } else if (element.empType === "Engineer") {
            y = new Engineer(element.name, element.id, element.email, element.github)
            emps.push(y);
        } else {
            z = new Intern(element.name, element.id, element.email, element.school)
            emps.push(z);
        }
        rendered = render(emps);
        fs.writeFile(outputPath, rendered, (err)=>{
            if (err) throw err;
            console.log('rendered data has been written');
        })
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
init();