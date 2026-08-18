/**
 * Loon HTTP-Request Script for Google Signup Bypass
 * Format: [Script] http-request <URL> script-path=clean_request.js
 */

const headers = $request.headers || {};

// 1. Chuyển tất cả key về chữ thường để dễ thao tác
let newHeaders = {};
for (let key in headers) {
    newHeaders[key.toLowerCase()] = headers[key];
}

// 2. Chặn/Bóc tách Cookie định danh bị Google gán cho thiết bị
if (newHeaders['cookie']) {
    let rawCookies = newHeaders['cookie'].split(';');
    let cleanCookies = [];

    for (let c of rawCookies) {
        let cookiePair = c.trim();
        // Lọc bỏ các Cookie dùng để Fingerprint/Đếm thiết bị
        if (
            !/^CONSISTENCY=/i.test(cookiePair) &&
            !/^AEC=/i.test(cookiePair) &&
            !/^NID=/i.test(cookiePair) &&
            !/^__Secure-ENID=/i.test(cookiePair) &&
            !/^_gcl_/i.test(cookiePair)
        ) {
            cleanCookies.push(cookiePair);
        }
    }

    // Gán lại chuỗi Cookie sạch
    if (cleanCookies.length > 0) {
        newHeaders['cookie'] = cleanCookies.join('; ');
    } else {
        delete newHeaders['cookie'];
    }
}

// 3. Xóa các Header lộ vết iOS / Client Device
delete newHeaders['x-goog-ext-272006459-jspb'];
delete newHeaders['x-google-gfe-device-memory'];
delete newHeaders['x-client-data'];

console.log("[Loon Clean Request Success] -> " + $request.url);

// 4. Trả về Request đã sửa đổi cho Loon
$done({
    headers: newHeaders
});
