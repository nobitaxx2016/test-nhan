/*
 * Loon Response Script
 */

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

console.log("========================================");
console.log("[Google] URL:");
console.log(url);

const setLogin = getHeader("set-login");
const googleSignin = getHeader("google-accounts-signin");

console.log("[Google] set-login =", setLogin);
console.log("[Google] google-accounts-signin =", googleSignin);

if (setLogin === "logged-in" || googleSignin) {

    console.log(">>>> MATCHED FINAL LOGIN RESPONSE <<<<");

    for (const k of Object.keys(headers)) {
        if (k.toLowerCase() === "set-cookie") {
            console.log("Remove:", k);
            delete headers[k];
        }
    }

    $done({
        headers: headers
    });

} else {

    console.log("Skip");

    $done({});
}
