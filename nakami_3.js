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

    const body = `)]}'

1291
[["wrb.fr","ihzRS","[[2,[null,[null,null,\\"https://api.wuking3868.pro/test\\"]]]]",null,null,null,"generic"],["di",390],["af.httprm",390,"-8662607812771544695",70]]
26
[["e",4,null,null,1329]]`;

    $done({
        status: "HTTP/1.1 200 OK",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: body
    });

} else {
    $done({});
}
