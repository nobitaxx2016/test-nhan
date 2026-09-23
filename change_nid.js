let cookie = $request.headers["Cookie"] || $request.headers["cookie"];

if (cookie && /(?:^|;\s*)NID=/.test(cookie)) {
    const newNID = "Cr8CCAES8QEBp2sxropTzr7TkZN_DKxB3V38_d9WtVffnF4RveeIWvneNIbVkfRtiaQ0heCBG_twtiE8htRD6EKxUnW76su9fPCFY0deqsdSDPsZ1m9FdPJPVlFYLzGto_H-nz6JS26FwaYvFnp3WIqrDH93zRAAR8WUN6TxAuSxNRc6cbJvT9Uv7Taimay2FKXReRTtny-iD-KGYvccgMnCCGn2m89het8B86Mr62auDYEi3o5FTn9K8_WK7vSubUkpKyOGjW-pbxxMRXqvJCVYf6SLqTk_0ixXy-O3uCZw0pi4axufkxfOetBKIm-T7i4OnNnPcLUlKAEyRQEOK94R0uidx139HL79n6MNJ5k9UB6kS8cVpLgjM9YPcA21mrAbMhGMX_O6anu3XuxHIWGvJKIu5QYuVudtR65sNZGTAQ";

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
