let url = $request.url;

const blocked = [
    /^https:\/\/accounts\.google\.com\/com\.google\.sso.*authCallback.*/,
    /^https:\/\/oauth2\.googleapis\.com\/token$/,
    /^https?:\/\/accounts\.google\.com\/SafariVCRedirect.*/
];

if (blocked.some(r => r.test(url))) {
    $done({
        response: {
            status: 502,
            body: "Blocked by Loon"
        }
    });
}

$done({});
