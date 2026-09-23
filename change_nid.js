let cookie = $request.headers["Cookie"] || $request.headers["cookie"];

if (cookie && /(?:^|;\s*)NID=/.test(cookie)) {
    const newNID = "NID_GIA_TRI_CUA_BAN";

    cookie = cookie.replace(
        /(^|;\s*)NID=[^;]*/,
        `$1NID=${newNID}`
    );

    if ($request.headers["Cookie"]) {
        $request.headers["Cookie"] = cookie;
    } else {
        $request.headers["cookie"] = cookie;
    }
}

$done({
    headers: $request.headers
});
