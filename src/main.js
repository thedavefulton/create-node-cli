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
  console.log(packageJson);
  const updatedPackageJson = {
    ...packageJson,
    name: options.package,
    author: options.author,
  };
  console.log(updatedPackageJson);
  fs.writeFileSync(`${options.targetDirectory}/package.json`, JSON.stringify(updatedPackageJson, null, 2));
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}

exports.createProject = async function createProject(options) {
  options = {
    ...options,
    targetDirectory: `${process.cwd()}/${options.package}`,
  };

  await mkdirp(options.targetDirectory);
  const templateDir = path.resolve(__dirname, '../templates/javascript');
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
        }),
    },
    {
      title: 'Update package.json',
      task: () => updatePackageJson(options),
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
