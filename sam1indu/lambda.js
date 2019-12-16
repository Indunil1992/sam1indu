let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    ddb.get({
        TableName: "testIndu",
        Key: {
            test: "1"
        }
    }).promise()
        .then(data => {
            // your code goes here
        })
        .catch(err => {
            // error handling goes here
        });

    return { "message": "Successfully executed" };
};