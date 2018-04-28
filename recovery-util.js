const sr = require('./starrezrest');

function makeObjects(input) {
    const recoveryObjectArray = input.map(element => {
        const fields = element.Description.split('\n');
        let record = {
            TableName: element.TableName
        };
        fields.forEach(field => {
            valueParts = field.split('|');
            if (valueParts.length === 3
                && valueParts[1]
                && valueParts[1] !== 'null'
                && valueParts[1] !== '0'
                && valueParts[1] !== 'False') {

                // Transform "field|existingData|newData" to record[field] = existingData;
                record[valueParts[0]] = valueParts[1];
            }
        });
        return record;
    });
    return recoveryObjectArray;
}

exports.simulate = (input) => {
    makeObjects(input).forEach(obj => {
        sr.simulateCreateRecord(obj);
    });
}

exports.recover = (input) => {
    makeObjects(input).forEach(obj => {
        sr.createRecord(obj);
    });
}