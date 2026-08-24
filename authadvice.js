/*
 * Loon Request Script
 * Random device_id for OAuth Account Manager authadvice
 */

const url = $request.url;

// Chỉ xử lý endpoint này
const urlRegex =
    /^https:\/\/oauthaccountmanager\.googleapis\.com\/v1\/authadvice(?:\?.*)?$/;

if (!urlRegex.test(url)) {
    $done();
} else if (!$request.body) {
    console.log("[DeviceID] Request không có body");
    $done();
} else {

    try {
        // Parse JSON body
        let body = JSON.parse($request.body);

        // Kiểm tra device_id
        if (!body.device_id) {
            console.log("[DeviceID] Không tìm thấy device_id");
            $done();
        } else {

            const oldDeviceId = body.device_id;

            // Tạo UUID v4 ngẫu nhiên
            function generateUUID() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
                    .replace(/[xy]/g, function(c) {
                        const r = Math.floor(Math.random() * 16);
                        const v = c === "x"
                            ? r
                            : (r & 0x3) | 0x8;

                        return v.toString(16).toUpperCase();
                    });
            }

            // Tạo device_id mới
            const newDeviceId = generateUUID();

            // Thay đổi
            body.device_id = newDeviceId;

            console.log("========== DEVICE ID ==========");
            console.log("Old: " + oldDeviceId);
            console.log("New: " + newDeviceId);
            console.log("================================");

            // Gửi request với body mới
            $done({
                body: JSON.stringify(body)
            });
        }

    } catch (error) {

        console.log(
            "[DeviceID] JSON Parse Error: " + error
        );

        $done();
    }
}
