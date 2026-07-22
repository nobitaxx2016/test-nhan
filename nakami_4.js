/*
 * Google Response Patch
 * EMBEDDED -> SAFARI_AUTHENTICATION_SESSION
 */

let body = $response.body;

console.log("========== Google Advice Patch ==========");
console.log($request.url);

if (body.includes('"advice_code": "EMBEDDED"')) {

    console.log("Matched advice_code = EMBEDDED");

    body = body.replace(
        /"advice_code"\s*:\s*"EMBEDDED"/g,
        '"advice_code": "SAFARI_AUTHENTICATION_SESSION"'
    );

    console.log("Patched -> SAFARI_AUTHENTICATION_SESSION");

} else {

    console.log("No advice_code found.");

}

$done({
    body: body
});
