# @thedavefulton/create-node-cli

A basic CLI to scaffold out a Node.js project to build simple CLI packages using [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html). It was created both as an exercise and to ease daily setup while working through the [Advent of Code](https://adventofcode.com).

It has all of the basic files and configuration required, as well as a number of packages ([Lodash](https://lodash.com/docs/4.17.15), [Chalk](https://github.com/chalk/chalk), [Prettier](https://prettier.io/docs/en/index.html)) to ease rapid development.

## Usage

The easiest & recommended way to use it is with npx:

```
npx @thedavefulton/create-node-cli
```

If you must, you could also install it globally (but really: don't)

```
npm install -g @thedavefulton/create-node-cli
```

It will prompt you for the name of your project, your name (for use in the `package.json` author) and whether you'd like to initialize a git repository.

You can also pass a number of flags when running the command:

```
Usage: create-node-cli [options]
    -p, --project       name of the project
    -a, --author        name of the author
    -g, --git           initialize a git repository
```

**NOTE**: The program will try to load the user name from your git config. If found it will offer it as the default name.

## Contributing

I'm happy to hear anyone's thoughts on how this could be made easier to use. If you have thoughts on simplifying the install or a way to make it easier to get started hacking please open an [Issue](https://github.com/thedavefulton/create-node-cli/issues) or [Pull request](https://github.com/thedavefulton/create-node-cli/pulls)!
