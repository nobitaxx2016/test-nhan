const headers = $request.headers || {};

let hasConsistency = false;

for (const key in headers) {
    if (
        key.toLowerCase() === "cookie" &&
        /(?:^|[;\s])CONSISTENCY=/i.test(headers[key])
    ) {
        hasConsistency = true;
        break;
    }
}

if (hasConsistency) {
    console.log("BLOCKED: " + $request.url);

    $done({
        response: {
            status: 403,
            headers: {
                "Content-Type": "text/plain"
            },
            body: "Blocked by Loon"
        }
    });
} else {
    $done({});
}
