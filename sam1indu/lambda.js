let AWS = require('aws-sdk');
const ses = new AWS.SES();
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    ddb.get({
        TableName: "testIndu",
        Key: {
            test: "1"
        }
    }).promise()
        .then(data => {
            console.log("dataaa");
            s3.listObjects({
                'Bucket': 'as2-test-lahiru',
                'MaxKeys': 10,
                'Prefix': ''
            }).promise()
                .then(data => {
                    console.log(data);           // successful response
                    console.log("pass-s3-ok");

                    /*
                    data = {
                        Contents: [
                            {
                               ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"",
                               Key: "example1.jpg",
                               LastModified: "<Date Representation>",
                               Owner: {
                                  DisplayName: "myname",
                                  ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
                               },
                               Size: 11,
                               StorageClass: "STANDARD"
                            },
                            // {...}
                        ]
                    }
                    */
                })
                .catch(err => {
                    console.log(err, err.stack); // an error occurred
                    console.log("pass-s3-errr");

                });
            // your code goes here
        })
        .catch(err => {
            console.log("errrrrrrrrrr");
            s3.listObjects({
                'Bucket': 'indunil.trigger',
                'MaxKeys': 10,
                'Prefix': ''
            }).promise()
                .then(data => {
                    console.log(data);           // successful response
                    console.log("errr-s3-ok");

                    /*
                    data = {
                        Contents: [
                            {
                               ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"",
                               Key: "example1.jpg",
                               LastModified: "<Date Representation>",
                               Owner: {
                                  DisplayName: "myname",
                                  ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
                               },
                               Size: 11,
                               StorageClass: "STANDARD"
                            },
                            // {...}
                        ]
                    }
                    */
                })
                .catch(err => {
                    console.log(err, err.stack); // an error occurred
                    console.log("errr-s3-errr");

                });
            // error handling goes here
        });
    ses.sendEmail({
        Destination: {
            ToAddresses: ['indunil@adroitlogic.com'],
            CcAddresses: [],
            BccAddresses: []
        },
        Message: {
            Body: {
                Text: {
                    Data: ``
                }
            },
            Subject: {
                Data: 'test1'
            }
        },
        Source: 'sachithrarajapakse1992@gmail.com',
    }, function (err, data) {
        if (err) {console.log(err, err.stack); // an error occurred
                            console.log("ses-errr");}

        else console.log(data); 
                                    console.log("ses-passDataaa");
        // successful response
    });

    return { "message": "Successfully executed with DDB" };
};