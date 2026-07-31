const url = $request.url;

// Chỉ xử lý đúng endpoint này
if (!url.includes("/lifecycle/_/AccountLifecyclePlatformSignupUi/data/batchexecute")) {
    $done({});
    return;
}

// Đọc bộ đếm
let count = parseInt($persistentStore.read("glif_counter") || "0");

// Tăng
count++;

// Lưu
$persistentStore.write(String(count), "glif_counter");

console.log("================================");
console.log("GLIF Request #" + count);
console.log(url);

// ====== Chỉ cho request đầu tiên ======

if (count > 1) {

    console.log("BLOCK");

    $done({
        response: {
            status: 404,
            headers: {
                "Content-Type": "text/plain"
            },
            body: ""
        }
    });

} else {

    console.log("PASS");

    $done({});
}
