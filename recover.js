/**
 * Recover deleted records from Activity Log data.
 */

const fs = require('fs');
const myEnv = require('dotenv').config();
const inquirer = require('inquirer');
const chalk = require('chalk');

const inputFile = process.argv[2];
let input;

try {
    input = JSON.parse(fs.readFileSync(inputFile));
    valid = input && Array.isArray(input) && input.every((currentValue) => {
        return typeof currentValue.LogActivityID === 'number' && typeof currentValue.TableName === 'string' && typeof currentValue.Description === 'string';
    });
    if (!valid) {
        throw new Error('Values do not match required fields from LogActivity table.');
    }
    console.log(chalk.green.bold('Input file valid'));
} catch (e) {
    console.log(e.message);
    console.log(chalk.red.bold('Invalid input file'));
    process.exit(1);
}

const sr = require('./starrezrest');
const recoveryUtil = require('./recovery-util');

inquirer.prompt([
    {
        type: 'confirm',
        name: 'simulate',
        message: 'Simulate recovery?',
        default: true
    },
    {
        type: 'confirm',
        name: 'production',
        message: 'POST to production environment?',
        default: false
    },
    {
        type: 'input',
        name: 'shortname',
        message: 'Customer Shortname:',
        default: process.env.SR_SHORTNAME,
        validate: (value) => { return value.match(/^\w{2,16}$/) ? true : 'Invalid shortname. This is usually a 2-8 letter code for your organization.' }
    },
    {
        type: 'input',
        name: 'username',
        message: 'StarRez Username:',
        default: process.env.SR_USERNAME,
        validate: (value) => { return value.match(/^[\w@\.]{1,100}$/) ? true : 'Invalid username.' }
    },
    {
        type: 'password',
        name: 'token',
        message: 'Web Services Token:',
        mask: '*',
        default: process.env.SR_TOKEN,
        validate: (value) => { return value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) ? true : 'Invalid token.' }
    }
]).then(responses => {
    if (responses.simulate) {
        recoveryUtil.simulate(input);
    } else {
        process.env['SR_ENVIRONMENT'] = responses.production ? '' : 'Dev';
        if (responses.production) {
            console.log('POSTing to production.');
            recoveryUtil.recover(input);
        } else {
            console.log('POSTing to development.');
            recoveryUtil.recover(input);
        }
    }
}).catch(error => {
    console.log(error);
});