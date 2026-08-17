/*
 * Loon Response Script
 */

const url = $request.url;
const headers = $response.headers || {};

// Nội dung body đã được cập nhật URL mới
// const newBody = `)]}'

// 1290
// [["wrb.fr","ihzRS","[[2,[null,[null,null,\\"https://api.wuking3868.pro/test\\\\u0026flowName\\\\u003dGlifSetupSafariVC\\\\u0026client_id\\\\u003d936475272427.apps.googleusercontent.com\\\\u0026tmpl\\\\u003dsearch\\\\u0026auth_extension\\\\u003dADa53XLd2a4mOUndnH_ectqM3AKcQg8-F3p09wEBMFKMK0RHwnXJ8jgW-sYpA-0Y3gQ9EdvCuEEM_XE_aV2xShEj6SlUyEI6BOXDW3HLn-q3zptD-04wnSI\\\\u0026redirect_uri\\\\u003dcom.google.sso.1086610230652-dcccrp116a653pr51iqrine19ponon0b:/authCallback?login%3Dcode\\\\u0026scope\\\\u003dhttps://www.google.com/accounts/OAuthLogin+https://www.googleapis.com/auth/userinfo.email\\\\u0026delegated_client_id\\\\u003d1086610230652-dcccrp116a653pr51iqrine19ponon0b.apps.googleusercontent.com\\\\u0026chtml\\\\u003dLoginDoneHtml\\\\u0026continue\\\\u003dhttps://accounts.google.com/SafariVCRedirect?redirect_uri%3Dcom.google.sso.1086610230652-dcccrp116a653pr51iqrine19ponon0b:/authCallback?login%253Dcode%2526authorization_code%253D4/0AXEQxIBhZgof_aKUzDh8JkcB3QvCiVyBiHesgTfg1unM1stfn5a3HsBVRiUgRTRAId1J7Q\\\\u0026gidl\\\\u003dEgIIAA\\"]]]]",null,null,null,"generic"],["di",363],["af.httprm",363,"8696530325090284105",34]]
// 26
// [["e",4,null,null,1328]]`;

const newBody = "block website."; 


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
        headers: headers,
        body: newBody
    });

} else {

    console.log("Skip");

    $done({});
}
