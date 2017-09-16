// curl -X GET "https://merchproducturl.storefront.vpsvc.com/v1/url/en-us?url-version=v1&requester=swagger" -H  "accept: application/json"

var request = require('request-promise-native');

// var cultures = [
//     "en-us",
//     "en-gb",
//     "de-de",
//     "ja-jp",
//     "en-gb",
//     "en-ca",
//     "en-au",
//     "fr-fr",
//     "it-it",
//     "sv-se",
//     "nl-nl",
//     "es-es",
//     "es-us",
//     "fr-ca",
//     "fr-be",
//     "nl-be",
//     "de-ch",
//     "fr-ch",
//     "it-ch",
//     "en-ie",
//     "en-nz",
//     "nb-no",
//     "da-dk",
//     "de-at",
//     "fi-fi",
//     "pt-pt",
//     "cs-cz",
//     "en-sg",
//     "ko-kr",
//     "tr-tr",
//     "zh-tw",
//     "en-in"
// ];

var cultures = [
    "cs-cz",
    "en-us"
];

var responses = cultures.map(function (culture) {
    return request({
        uri: "https://merchproducturl.storefront.vpsvc.com/v1/url/" + culture + "?url-version=v1&requester=s3ify-laban",
        resolveWithFullResponse: true,
        json: true
    })
    .then(function (response) {
        return response;
    })
    .catch(function (err) {
        return err;
    });
});

Promise.all(responses)
    .then(function (completeResponses) {
        completeResponses.forEach(function (resp) {
            if (resp.body) {
                console.log(resp.body);
            } else {
                console.log(resp.message);
            }
        });
    })
    .catch(function (err) {
        console.log("ALL err: " + err);
    });



