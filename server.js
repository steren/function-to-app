#!/usr/bin/env node

// load user code
const userFunctionModule = require('../../');

// command line arguments
const optionDefinitions = [
  { name: 'function', type: String, defaultOption: true, defaultValue: '' },
  { name: 'trigger', type: String, defaultValue: 'http' },
  { name: 'entry-point', type: String }
]
const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

const functionName = options.function;
const entrypoint = options.entrypoint || options.function;
const trigger = options.trigger;

if(!userFunctionModule[entrypoint]) {
  return console.error(`Function does not export entrypoint "${entrypoint}".`);
}

// Create app
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get(`/${functionName}`, userFunctionModule[entrypoint]);
app.post(`/${functionName}`, userFunctionModule[entrypoint]);

// Redirect when arriving to '/'
if(functionName) {
  app.get(`*`, (req, res) => {return res.redirect(`/${functionName}`)});
  app.post(`*`, (req, res) => {return res.redirect(`/${functionName}`)});
}

const server = app.listen(process.env.PORT || 8080, () => {
  const host = server.address().address;const port = server.address().port;
  console.log(`Function serving at http://${host}:${port}/${functionName}`);
});
