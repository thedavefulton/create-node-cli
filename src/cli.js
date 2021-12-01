const arg = require('arg');
const inquirer = require('inquirer');
const execa = require('execa');
const chalk = require('chalk');
const { createProject } = require('./main');

function parseArgumentsIntoOptions(rawArgs) {
  console.log(rawArgs);
  const args = arg(
    {
      '--project': String,
      '-p': '--project',
      '--name': String,
      '-n': '--name',
      '--git': Boolean,
      '-g': '--git',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    // template: args._[0] === 'ts' ? 'TypeScript' : args._[0] === 'js' ? 'JavaScript' : null,
    project: args['--project'] || '',
    name: args['--name'] || '',
    git: args['--git'] || null,
  };
}

async function getGitUserName() {
  try {
    const result = await execa('git', ['config', 'user.name']);
    return result.stdout;
  } catch (err) {
    console.error('%s Error retrieving git user.name', chalk.red.bold('ERROR'));
    return null;
  }
}

async function promptForMissingOptions(options) {
  const defaultUserName = await getGitUserName();
  if (!options.name && defaultUserName) options.name = defaultUserName;

  const questions = [];

  if (!options.template) {
    // questions.push({
    //   type: 'list',
    //   name: 'template',
    //   message: 'Please choose which project template to use',
    //   choices: ['TypeScript', 'JavaScript'],
    //   default: 'TypeScript',
    // });

    if (!options.project) {
      questions.push({
        type: 'input',
        name: 'project',
        message: 'Please enter name of project',
      });
    }

    if (!options.name) {
      questions.push({
        type: 'input',
        name: 'author',
        message: 'Please enter name of author',
        default: '',
      });
    }

    if (!options.git) {
      options.git = false;
    }
  }

  const answers = await inquirer.prompt(questions);

  return { ...options, ...answers };
}

exports.cli = async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
};
