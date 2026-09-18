let headers = $request.headers;

// Replace trong Header
for (let key in headers) {
    if (typeof headers[key] === "string") {
        headers[key] = headers[key].replace(/26\.07\.2/g, "26.37.3");
    }
}

// Replace trong Body
let body = $request.body;
if (body) {
    body = body.replace(/26\.07\.2/g, "26.37.3");
}

$done({
    headers,
    body
});
