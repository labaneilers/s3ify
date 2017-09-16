// curl -X GET "https://merchproducturl.storefront.vpsvc.com/v1/url/en-us?url-version=v1&requester=swagger" -H  "accept: application/json"

const request = require('request-promise-native');

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const zlib = require('zlib');

const cultures = [
    "en-us",
    "en-gb",
    "de-de",
    "ja-jp",
    "en-gb",
    "en-ca",
    "en-au",
    "fr-fr",
    "it-it",
    "sv-se",
    "nl-nl",
    "es-es",
    "es-us",
    "fr-ca",
    "fr-be",
    "nl-be",
    "de-ch",
    "fr-ch",
    "it-ch",
    "en-ie",
    "en-nz",
    "nb-no",
    "da-dk",
    "de-at",
    "fi-fi",
    "pt-pt",
    "cs-cz",
    "en-sg",
    "ko-kr",
    "tr-tr",
    "zh-tw",
    "en-in"
];

// var cultures = [
//     "cs-cz",
//     "en-us"
// ];

var responses = cultures.map(culture => {
    return request({
        uri: "https://merchproducturl.storefront.vpsvc.com/v1/url/" + culture + "?url-version=v1&requester=s3ify-laban",
        resolveWithFullResponse: true,
        json: true
    })
    .then(resp => { return { response: resp, culture: culture }; })
    .catch(err => {
        console.error("Service error: " + err);
        return err;
    });
});

// When all requests are complete, assemble results into a single json object and upload it to s3
Promise.all(responses)
    .then(function (completeResponses) {

        // Put complete responses into a dictionary keyed by culture
        var out = {};
        completeResponses
            .filter(r => !r.error) // filter out error responses
            .forEach(r => out[r.culture] = r.response.body);

        // Gzip body
        var body = zlib.gzipSync(JSON.stringify(out, null, 2));

        // put to s3
        return s3.putObject({ 
            Bucket: "s3ify-experiment", 
            Key: "mp-url", 
            Body: body, 
            ContentType: "application/json",
            ContentEncoding: "gzip"
            })
            .promise()
            .catch(err => console.error("S3 upload error: " + err));
    });