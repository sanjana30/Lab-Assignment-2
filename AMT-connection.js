var AWS = require('aws-sdk');
var region = 'us-east-1';
var aws_access_key_id = 'jhbdwwdhk';
var aws_secret_access_key = 'awsikbehnrkr';

AWS.config = {
    "accessKeyId": aws_access_key_id,
    "secretAccessKey": aws_secret_access_key,
    "region": region,
    "sslEnabled": 'true'
};

var endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';

// Uncomment this line to use in production
// endpoint = 'https://mturk-requester.us-east-1.amazonaws.com';

var mturk = new AWS.MTurk({ endpoint: endpoint });

// This will return $10,000.00 in the MTurk Developer Sandbox
mturk.getAccountBalance(function(err, data){
    console.log(data.AvailableBalance);
});


// var aws_access_key_id = 'AKIAJMJGXPF6EQ5EW52A';
// var aws_secret_access_key = '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';