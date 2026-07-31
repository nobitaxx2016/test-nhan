const url = $request.url;

console.log("===== SCRIPT START =====");


// Reset counter
// ^https://reset\.local/reset-counter request-script Google_GLIF_Counter.js
if (url.includes("/reset-counter")) {
    $persistentStore.write("0", "glif_counter");
    console.log("Counter reset");
    $done({
        response: {
            status: 200,
            body: "OK"
        }
    });
    return;
}

// Chỉ xử lý endpoint này
if (!url.includes("/lifecycle/_/AccountLifecyclePlatformSignupUi/data/batchexecute")) {
    $done({});
    return;
}

let count = parseInt($persistentStore.read("glif_counter") || "0");
count++;

$persistentStore.write(String(count), "glif_counter");

console.log("========================================");
console.log("[GLIF] Counter : " + count);
console.log("[GLIF] URL     : " + url);

// Chặn từ request thứ 2 trở đi
if (count > 1) {

    console.log("[GLIF] ACTION  : BLOCK");

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

    console.log("[GLIF] ACTION  : PASS");

    $done({});
}

console.log("===== SCRIPT END =====");

