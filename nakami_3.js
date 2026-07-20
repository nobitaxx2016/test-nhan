/*
 * Only handle the final Google login response
 * Remove Set-Cookie only when login is completed
 */

let headers = $response.headers || {};

// Tìm header không phân biệt hoa thường
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

// Chỉ xử lý response cuối
if (
    setLogin === "logged-in" ||
    googleSignin != null
) {

    console.log("Matched final login response.");

    for (const k of Object.keys(headers)) {
        if (k.toLowerCase() === "set-cookie") {
            delete headers[k];
        }
    }

    $done({
        headers: headers
    });

} else {
    $done({});
}

