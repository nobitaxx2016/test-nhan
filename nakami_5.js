const url = $request.url;
const headers = $request.headers || {};

function getHeader(name) {
    for (const k in headers) {
        if (k.toLowerCase() === name.toLowerCase()) {
            return headers[k];
        }
    }
    return null;
}

const cookie = getHeader("Cookie") || "";

console.log("========================================");
console.log("[Google] URL:");
console.log(url);
console.log("[Google] Cookie:");
console.log(cookie);

if (cookie.includes("CONSISTENCY=")) {

    console.log(">>>> BLOCK REQUEST (CONSISTENCY FOUND) <<<<");

    $done({
        status: "HTTP/1.1 403 Forbidden",
        headers: {
            "Content-Type": "text/plain"
        },
        body: "Blocked by Loon"
    });

} else {

    console.log("Skip");

    $done({});
}


// http-request ^https:\/\/accounts\.google\..* script-path=BlockConsistency.js, requires-body=false
