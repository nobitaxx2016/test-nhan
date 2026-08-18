/**
 * Loon HTTP-Response Script for Google Signup Bypass
 * Format: [Script] http-response <URL> script-path=clean_response.js
 */

const headers = $response.headers || {};

// 1. Chuyển key về chữ thường để dễ bóc tách
let newHeaders = {};
for (let key in headers) {
    newHeaders[key.toLowerCase()] = headers[key];
}

// 2. Xóa triệt để các Header ghi Cookie từ Google Server trả về
if (newHeaders['set-cookie']) {
    delete newHeaders['set-cookie'];
    console.log("[Loon Clean Response] -> Đã xóa Set-Cookie thành công từ: " + $request.url);
}

// Xóa thêm các header định danh bổ sung của Google (nếu có)
delete newHeaders['x-google-gfe-response-body-uncompressed'];

// 3. Trả về Response sạch cho Loon chuyển tiếp về cho App/SafariVC
$done({
    headers: newHeaders
});
