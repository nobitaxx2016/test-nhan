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

    console.log(">>>> BLOCK FINAL LOGIN RESPONSE <<<<");

    $done({
        status: "HTTP/1.1 403 Forbidden",
        headers: {
            "Content-Type": "text/plain"
        },
        body: "Blocked by Loon"
    });

} else {

    $done({});
}
