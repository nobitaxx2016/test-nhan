const url = $request.url;

// ^https?:\/\/loon\.local\/counter\/(on|off)(?:\?.*)?$


// ===== Bật Counter =====
if (url === "https://loon.local/counter/on") {

    $persistentStore.write("1", "glif_enable");
    $persistentStore.write("0", "glif_counter");

    $done({
        response: {
            status: 200,
            body: "Counter ON"
        }
    });
    return;
}

// ===== Tắt Counter =====
if (url === "https://loon.local/counter/off") {

    $persistentStore.write("0", "glif_enable");

    $done({
        response: {
            status: 200,
            body: "Counter OFF"
        }
    });
    return;
}

// ===== Chỉ xử lý Google =====
if (!url.includes("/lifecycle/_/AccountLifecyclePlatformSignupUi/data/batchexecute")) {
    $done({});
    return;
}

// Nếu đang OFF thì luôn PASS
if ($persistentStore.read("glif_enable") !== "1") {
    $done({});
    return;
}

// Đang ON -> bắt đầu đếm
let count = parseInt($persistentStore.read("glif_counter") || "0");
count++;

$persistentStore.write(String(count), "glif_counter");

console.log("Counter =", count);

// Ví dụ chỉ cho request đầu tiên
if (count > 1) {
    $done({
        response: {
            status: 404,
            body: ""
        }
    });
    return;
}

$done({});
