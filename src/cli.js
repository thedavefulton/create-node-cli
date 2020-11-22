const arg = require('arg');
const inquirer = require('inquirer');
const execa = require('execa');
const chalk = require('chalk');
const { createProject } = require('./main');

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '-g': '--git',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    git: args['--git'] || false,
  };
}

async function getGitUserName() {
  try {
    const result = await execa('git', ['config', 'user.name']);
    return result.stdout;
  } catch (err) {
    console.error('%s Error retrieving git user.name', chalk.red.bold('ERROR'));
  }
}

async function promptForMissingOptions(options) {
  const defaultUserName = await getGitUserName();

  const questions = [
    {
      type: 'input',
      name: 'package',
      message: 'Please enter name of project',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Please enter name of author',
      default: defaultUserName || '',
    },
  ];

  const answers = await inquirer.prompt(questions);

  return {
    ...answers,
  };
}

exports.cli = async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  // await createProject(options);
  // console.log(process.cwd());
  console.log(options);
};
