const url = $request.url;
const headers = $response.headers || {};

function getHeader(name) {
    for (const k in headers) {
        if (k.toLowerCase() === name.toLowerCase()) {
            return headers[k];
        }
    }
    return null;
}

const setLogin = getHeader("set-login");
const googleSignin = getHeader("google-accounts-signin");

console.log("========================================");
console.log(url);

if (setLogin === "logged-in" || googleSignin) {

    console.log(">>>> FETCH RESPONSE FROM MY SERVER <<<<");

    $httpClient.get("https://api.wuking3868.pro/test", function(err, resp, data) {

        if (err || !resp) {
            console.log("Fetch failed:", err);
            return $done({});
        }

        $done({
            status: resp.status || "HTTP/1.1 200 OK",
            headers: resp.headers,
            body: data
        });
    });

} else {

    $done({});
}
