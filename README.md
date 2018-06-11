# function-to-app

Transform a function into a Node.js application

## How to use

Write a module that exports a function, for example an `index.js` file exporting a function `hello`:

    exports.hello = (req, res) => {
        res.status(200).send('Hello World');
    };

In your `package.json`, add `function-to-app` as dependency:

    npm i function-to-app

In your `package.json` file, use the `func` executable as the start command:

    "scripts": {
        "start": "func hello"
    },

## Options

`func <NAME> --entry-point <FUNCTION_NAME>`
