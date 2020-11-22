# @thedavefulton/create-node-cli

A basic CLI to scaffold out a Node.js project to build simple CLI packages using [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html). It was created both as an exercise and to ease daily setup while working through the [Advent of Code](https://adventofcode.com).

It has all of the basic files and configuration required, as well as a number of packages ([Lodash](https://lodash.com/docs/4.17.15), [Chalk](https://github.com/chalk/chalk), [Prettier](https://prettier.io/docs/en/index.html)) to ease rapid development.

## Usage

The easiest & recommended way to use it is with npx:

```
npx @thedavefulton/create-node-cli
```

If you must, you could also install it globally (but really don't)

```
npm install -g @thedavefulton/create-node-cli
```

It will prompt you for a name for your project as well as the author name. If you have a username configured in your git it will default that as the author name.

You can also pass it `-g | --git` to have it initialize a git repository after it has installed your new project.

## Contributing

I'm happy to hear anyone's thoughts on how this could be made easier to use. If you have thoughts on simplifying the install or a way to make it easier to get started hacking please open an issue or pull request!
