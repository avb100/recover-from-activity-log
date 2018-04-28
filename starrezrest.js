const request = require('request');

/**
 * Call API
 * @param {string} path Request path following ../services/
 * @param {object} params Parameters for request
 * @return {object} Object returned by API call
 */
exports.createRecord = (obj) => {
    const tableName = obj.TableName;
    if (obj.TableName) {
        delete obj.TableName;
    }
    if (obj[`${tableName}ID`]) {
        delete obj[`${tableName}ID`];
    }
    if (obj.timestamp) {
        delete obj.timestamp;
    }

    let endpoint = `https://${process.env.SR_SHORTNAME}.starrezhousing.com/StarRezRest${process.env.SR_ENVIRONMENT}/services`;
    
    var options = {
        url: `${endpoint}/create/${tableName}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        form: obj
    }
    request.post(options, callback).auth(process.env.SR_USERNAME, process.env.SR_TOKEN, true);
}

function callback(error, response, body) {
    if (!error) {
        console.log(`\n${response.statusCode} ${response.statusMessage}\n${body}\n`);
    } else {
        console.log(error);
    }
}

exports.simulateCreateRecord = (obj) => {
    const tableName = obj.TableName;
    if (obj.TableName) {
        delete obj.TableName;
    }
    if (obj[`${tableName}ID`]) {
        delete obj[`${tableName}ID`];
    }
    if (obj.timestamp) {
        delete obj.timestamp;
    }

    let endpoint = `https://${process.env.SR_SHORTNAME}.starrezhousing.com/StarRezRest${process.env.SR_ENVIRONMENT}/services`;

    var options = {
        url: `${endpoint}/create/${tableName}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        form: obj
    }
    console.log(`\n\nPOST ${options.url}\n`);
    console.log(options.form);
}
