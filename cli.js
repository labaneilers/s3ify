var app = require("./app");

app.handler({}, {}, (err, result) => {
    if (err) {
        console.error("FAILED: " + err);
        return;
    }

    console.log(result);
});