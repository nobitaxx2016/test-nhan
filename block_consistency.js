const headers = $request.headers || {};

for (const key in headers) {
    if (key.toLowerCase() === "cookie") {
        // Xóa riêng cookie CONSISTENCY=...
        headers[key] = headers[key]
            .replace(/(?:^|;\s*)CONSISTENCY=[^;]*/gi, "")
            .replace(/^;\s*|\s*;$/g, "")
            .replace(/;\s*;/g, ";");
    }
}

$done({
    headers: headers
});
