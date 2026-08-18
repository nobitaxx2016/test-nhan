// clean_google.js

if ($script.type === "http-request") {
    // 1. CHẶN ĐỊNH DANH GỬI ĐỊ: Xóa toàn bộ Cookie thiết bị cũ trong Request POST
    let headers = $request.headers;
    delete headers['Cookie'];
    delete headers['cookie'];
    
    // Fake hoặc Xóa các Header lộ vết Device của App
    delete headers['X-Google-GFE-Device-Memory'];
    delete headers['X-WebKit-CSP'];
    
    $done({ headers: headers });

} else if ($script.type === "http-response") {
    // 2. CHẶN ĐỊNH DANH TRẢ VỀ: Xóa toàn bộ Set-Cookie từ Google Server trả về
    let headers = $response.headers;
    delete headers['Set-Cookie'];
    delete headers['set-cookie'];
    
    $done({ headers: headers });
}

// http-request ^https:\/\/accounts\.google\.com\/signup\/ script-path=clean_google.js, requires-body=true, tag=Clean_Google_Req
// http-response ^https:\/\/accounts\.google\.com\/signup\/ script-path=clean_google.js, requires-body=true, tag=Clean_Google_Res
