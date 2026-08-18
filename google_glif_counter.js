const url = $request.url;

// =========================
// Counter ON
// =========================
if (url === "https://loon.local/counter/on") {

    $persistentStore.write("1", "glif_enable");
    $persistentStore.write("0", "glif_counter");

    console.log("[GLIF] Counter ON");

    $done({
        response: {
            status: 200,
            headers: {
                "Content-Type": "text/plain"
            },
            body: "Counter ON"
        }
    });
    return;
}

// =========================
// Counter OFF
// =========================
if (url === "https://loon.local/counter/off") {

    $persistentStore.write("0", "glif_enable");

    console.log("[GLIF] Counter OFF");

    $done({
        response: {
            status: 200,
            headers: {
                "Content-Type": "text/plain"
            },
            body: "Counter OFF"
        }
    });
    return;
}

// Nếu Counter đang OFF thì luôn PASS
if ($persistentStore.read("glif_enable") !== "1") {
    $done({});
    return;
}

// =========================
// OFF -> luôn PASS
// =========================
let enable = $persistentStore.read("glif_enable") || "0";

if (enable !== "1") {
    console.log("[GLIF] PASS (Counter OFF)");
    $done({});
    return;
}

// =========================
// ON -> Đếm
// =========================
let raw = $persistentStore.read("glif_counter");

if (raw == null || raw === "") {
    raw = "0";
}

let count = Number(raw);

if (isNaN(count)) {
    count = 0;
}

count++;

$persistentStore.write(String(count), "glif_counter");

console.log("[GLIF] Counter = " + count);

// =========================
// Chặn sau request đầu tiên
// =========================
if (count > 0) {

    console.log("[GLIF] BLOCK");

    $done({
        response: {
            status: 404,
            headers: {
                "Content-Type": "text/plain"
            },
            body: ""
        }
    });

    return;
}

console.log("[GLIF] PASS");

$done({});
