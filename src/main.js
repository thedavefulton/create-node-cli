const execa = require('execa');
const Listr = require('listr');
const { projectInstall } = require('pkg-install');
const chalk = require('chalk');
const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const mkdirp = require('mkdirp');
const { promisify } = require('util');

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

function updatePackageJson(options) {
  const packageJson = require(`${options.targetDirectory}/package.json`);
  const updatedPackageJson = {
    ...packageJson,
    name: options.project,
    author: options.name,
  };
  fs.writeFileSync(`${options.targetDirectory}/package.json`, JSON.stringify(updatedPackageJson, null, 2));
}

async function performInitialCompile(options) {
  const result = await execa('yarn', ['ts:build'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to perform initial compile'));
  }
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
}

exports.createProject = async function createProject(options) {
  options = {
    ...options,
    targetDirectory: `${process.cwd()}/${options.project}`,
  };

  await mkdirp(options.targetDirectory);
  const templateDir = path.resolve(__dirname, `../template`);
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
          prefer: 'yarn',
        }),
    },
    {
      title: 'Update package.json',
      task: () => updatePackageJson(options),
    },
    {
      title: 'Performing initial compile',
      task: () => performInitialCompile(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
  ]);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
};
