const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const createTeam = () => {
  console.log("Start your team with your personal manager information: ");
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your Manager ID?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.managerName,
        response.managerId,
        response.managerEmail,
        response.officeNumber
      );
      team.push(manager);
      teamMembers();
    });

  function teamMembers() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "addTeam",
          message:
            "What kind of team member do you want to create? If done select 'team completed'",
          choices: ["engineer", "intern", "team completed"],
        },
      ])
      .then((data) => {
        if (data.addTeam === "engineer") {
          engineerQuestions();
        } else if (data.addTeam === "intern") {
          internQuestions();
        } else {
          finalTeam();
        }
      });
  }

  const internQuestions = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's ID?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email address?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What school does your intern attend?",
        },
      ])
      .then((response) => {
        const intern = new Intern(
          response.internName,
          response.internId,
          response.internEmail,
          response.internSchool
        );
        team.push(intern);
        teamMembers();
      });
  };
  const engineerQuestions = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's ID?",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email address?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's GitHub username?",
        },
      ])
      .then((response) => {
        const engineer = new Engineer(
          response.engineerName,
          response.engineerId,
          response.engineerEmail,
          response.engineerGithub
        );
        team.push(engineer);
        teamMembers();
      });
  };
};

function finalTeam() {
  console.log("Team is now created!");
  const generateTeam = team.join(``);
  fs.writeFile(outputPath, render(team), "utf-8", (err) => {
    if (err) throw err;
  });
}

createTeam();
//   .then((answers) => writeFileAsync("index2.html", generateHTML(answers)))
//   .then(() => console.log("Successfully wrote to index.html"))
//   .catch((err) => console.error(err));

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
